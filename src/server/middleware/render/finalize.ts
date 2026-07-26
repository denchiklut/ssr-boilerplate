import { logger } from '@/common/logger'
import type { RequestStore } from '@/server/request'

/** Safety valve: a leaked `renderLock` flushes headers late instead of hanging the response. */
const LOCK_TIMEOUT = 10_000

const GATE = Symbol('gate')
const INTERRUPT = Symbol('interrupt')
const TIMEOUT = Symbol('timeout')

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
 * buffering body chunks in the meantime. See docs/response.md §5.3.
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
	const timeout = new Promise<typeof TIMEOUT>(resolve =>
		setTimeout(() => resolve(TIMEOUT), LOCK_TIMEOUT).unref()
	)

	// An in-flight read carries over when the gate or interrupt wins the race —
	// it becomes the first thing the output stream awaits.
	let read: Promise<ReadResult> | null = null
	let closed = false

	while (true) {
		read ??= reader.read()
		const { gate } = store.lock

		const winner = await Promise.race([
			read,
			gate ? Promise.race([gate.then<typeof GATE>(() => GATE), timeout]) : interrupt
		])

		// A lock released — re-race: a chained lock may have re-armed the gate.
		if (winner === GATE) continue
		if (winner === INTERRUPT) break
		if (winner === TIMEOUT) {
			logger.warn('renderLock held for over %dms — flushing response headers', LOCK_TIMEOUT)
			break
		}

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
