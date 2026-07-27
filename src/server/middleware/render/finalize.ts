import type { RequestStore } from '@/rsc'

const GATE = Symbol('gate')
const INTERRUPT = Symbol('interrupt')

type ReadResult = ReadableStreamReadResult<Uint8Array>

const applyStore = (response: Response, store: RequestStore, body: BodyInit | null) => {
	const { response: state } = store
	const headers = new Headers(response.headers)

	for (const [name, value] of state.headers) {
		if (name !== 'set-cookie') headers.set(name, value)
	}
	for (const cookie of state.headers.getSetCookie()) {
		headers.append('set-cookie', cookie)
	}

	return new Response(body, {
		status: state.status ?? response.status,
		statusText: state.statusText ?? response.statusText,
		headers
	})
}

/**
 * Defers the status/headers snapshot of a streamed response until every
 * `renderLock` has released (or one idle macrotask passes with none held),
 * buffering body chunks in the meantime. See docs/rsc.md §8.6.
 *
 * Adapted from @lazarv/react-server's render lock, which is two pieces
 * (permalinks pinned at e58d437):
 *
 * - the counting semaphore — `useRender().lock` in `server/render.mjs`:
 *   https://github.com/lazarv/react-server/blob/e58d437ca9db895b71a52c62c1552ad12a4cdf6f/packages/react-server/server/render.mjs#L17-L45
 *   A `RENDER_LOCK` counter plus a `RENDER_WAIT` promise parked in per-request
 *   context, whose decrement is deferred by one `immediate()` so chained locks
 *   leave no gap. Mirrored by `store.lock` here (docs/rsc.md §8.6).
 *
 * - the buffered read loop — inside the Flight render in `server/render-rsc.jsx`:
 *   https://github.com/lazarv/react-server/blob/e58d437ca9db895b71a52c62c1552ad12a4cdf6f/packages/react-server/server/render-rsc.jsx#L1289-L1331
 *   `Promise.race([read, getContext(RENDER_WAIT) ?? interrupt])`, carrying an
 *   in-flight read over via `next`, then snapshotting `HTTP_STATUS`/
 *   `HTTP_HEADERS` into a `Response` once the race breaks. That is the loop
 *   below; `read ??= reader.read()` is their `next`.
 *
 * One deliberate difference: their loop lives inside the renderer and only
 * covers Flight, whereas this one wraps the opaque `Response` from `handler`
 * (so it covers Fizz documents, `.rsc` payloads and actions alike). Like
 * upstream, there is no lock timeout — a leaked unlock waits on the stream
 * ending, and the bound on that is the client disconnecting: the request's
 * abort signal (wired in `toWebRequest`) aborts the render, which ends the
 * stream. Nothing in either piece touches the Flight implementation, which is
 * why it ports to `react-server-dom-rspack` unchanged.
 */
export const finalizeResponse = async (
	response: Response,
	store: RequestStore
): Promise<Response> => {
	if (!response.body) return applyStore(response, store, null)

	const reader = response.body.getReader()
	const buffered: Uint8Array[] = []
	const interrupt = new Promise<typeof INTERRUPT>(resolve =>
		setImmediate(() => resolve(INTERRUPT))
	)

	// An in-flight read carries over when the gate or interrupt wins the race —
	// it becomes the first thing the output stream awaits.
	let read: Promise<ReadResult> | null = null
	let closed = false

	while (true) {
		read ??= reader.read()
		const { gate } = store.lock

		const winner = await Promise.race([read, gate?.then<typeof GATE>(() => GATE) ?? interrupt])

		// A lock released — re-race: a chained lock may have re-armed the gate.
		if (winner === GATE) continue
		if (winner === INTERRUPT) break

		read = null
		if (winner.done) {
			closed = true
			break
		}
		buffered.push(winner.value)
	}

	const body = new ReadableStream<Uint8Array>({
		start(controller) {
			for (const chunk of buffered) controller.enqueue(chunk)
			if (closed) controller.close()
		},
		async pull(controller) {
			const result = await (read ?? reader.read())
			read = null

			if (result.done) controller.close()
			else controller.enqueue(result.value)
		},
		cancel(reason) {
			return reader.cancel(reason)
		}
	})

	return applyStore(response, store, body)
}
