# Response API — headers, status & cookies from server components

How a server component can **await data and then still mutate the HTTP response** — set `Cache-Control` from fetched page data, set a status code, append `Set-Cookie` — even though the response streams.

- [1. The problem](#1-the-problem)
- [2. When do headers actually flush in this repo?](#2-when-do-headers-actually-flush-in-this-repo)
- [3. The API](#3-the-api)
  - [3.1 `setHeader` / `appendHeader` / `deleteHeader`](#31-setheader--appendheader--deleteheader)
  - [3.2 `status`](#32-status)
  - [3.3 `setCookie` / `deleteCookie`](#33-setcookie--deletecookie)
  - [3.4 `renderLock`](#34-renderlock)
- [4. How it works](#4-how-it-works)
  - [4.1 Response state rides the request store](#41-response-state-rides-the-request-store)
  - [4.2 The lock is a counting semaphore](#42-the-lock-is-a-counting-semaphore)
  - [4.3 The finalize loop](#43-the-finalize-loop)
  - [4.4 Why a lock taken before the first `await` can never race](#44-why-a-lock-taken-before-the-first-await-can-never-race)
- [5. Rules & caveats](#5-rules--caveats)
- [6. Verified behaviour](#6-verified-behaviour)

---

## 1. The problem

RSC responses **stream**. That is the whole point — the browser starts receiving the page shell while slow data is still loading. But it creates a fundamental tension with HTTP: **status and headers go out with the first body byte**, and after that they are immutable.

So this, naively, cannot work:

```tsx
export default async function ProductPage({ params }) {
    const product = await getProduct(params.id)          // slow
    // ⛔ too late? the stream may already have flushed
    setHeader('Cache-Control', product.draft ? 'no-store' : 's-maxage=300')
    return <Product data={product} />
}
```

Yet it is exactly what you want: derive caching policy (or a cookie, or a status code) **from the data the page itself fetched**. Next.js punts on this — `headers()` is read-only, response mutation is confined to middleware/route handlers, which run *before* the page and can't see its data.

The way out is a **render lock**, and the name is a misnomer: rendering and streaming never pause. What gets held is the *flush of status + headers to the socket*, while the render runs at full speed and its output piles into a buffer. That needs nothing from the Flight implementation — it sits entirely around an opaque stream at the HTTP layer, which is why it works here with React's own `react-server-dom-rspack`. (Credit for the design: see the note in [`finalize.ts`](../src/server/middleware/render/finalize.ts).)

## 2. When do headers actually flush in this repo?

The two request types (docs/rsc.md §3) have very different natural timing:

| | Document (`GET /page`) | Data (`GET /page.rsc`, `POST` action) |
|---|---|---|
| Response construction | after the **Fizz shell** is ready | immediately, in `generateResponse` |
| What the shell waits for | every Flight row outside `<Suspense>` | nothing — Flight rows flush as they resolve |
| `await` + `setHeader` in a page component | ✅ works **without a lock** (unless the component is under `<Suspense>`) | ⛔ headers likely gone after the first rows flush |

For **document** requests, `handler` resolves only when `react-dom/server`'s `renderToReadableStream` promise settles — i.e. when the shell is complete — and the shell in turn awaits the Flight rows of all non-suspended content. A page component that awaits data and then calls `setHeader()` gets its header out *for free*.

Two gaps remain, and they are what the lock closes:

- components inside `<Suspense>` — the shell doesn't wait for them, on document requests;
- **all** components on `.rsc`/action requests — there is no shell, Flight streams eagerly.

Both are covered by one mechanism because both funnel through the same place: `handler` in [`rsc.tsx`](../src/server/middleware/render/rsc.tsx) returns a single web `Response` for every request type, and the finalize loop (§4.3) wraps exactly that.

## 3. The API

Everything lives in [`@/server/request`](../src/server/request/index.ts), next to `request()`, and follows the same rules: **server components and `'use server'` functions only** (guarded by `server-only` + a runtime invariant), callable at any depth, no prop-drilling.

### 3.1 `setHeader` / `appendHeader` / `deleteHeader`

```tsx
import { renderLock, setHeader } from '@/server/request'

export default async function ProductPage({ params }) {
    const product = await renderLock(async () => {
        const product = await getProduct(params.id)
        setHeader('Cache-Control', product.draft ? 'private, no-store' : 's-maxage=300, stale-while-revalidate=60')

        return product
    })

    return <Product data={product} />
}
```

The `renderLock` wrapper is what makes the post-`await` mutation reliable on *every* transport (§3.4). It isn't always required — **do you need it?** Decide by where the mutation runs and where the header must appear:

| Your mutation | Document (hard nav) | `.rsc` (client nav) | Verdict |
|---|---|---|---|
| **before** the component's first `await` | ✅ | ✅ | never needs a lock — always safe |
| after an `await`, **no lock**, component outside `<Suspense>` | ✅ (the Fizz shell holds the flush, §2) | ⛔ silently dropped | fine **iff** the header is document-only |
| after an `await`, **no lock**, under `<Suspense>` | ⛔ | ⛔ | always needs the lock |
| after an `await`, **inside `renderLock`** | ✅ | ✅ | the canonical form for data-derived headers |

So a top-level `setHeader` after an `await`, without a lock, is a legitimate pattern **when the header only matters for hard navigations** — the same component still runs on client navigations, its `setHeader` fires and is dropped, which is harmless if "no header on `.rsc`" is what you want. The moment the header must also be present when a user client-navigates onto the page, wrap the await in `renderLock`.

When deciding which bucket a header is in, don't dismiss the `.rsc` case as "just data, the HTML already loaded" — the payload response has its own URL and its own life in every HTTP cache. `Cache-Control` on `/page.rsc` is what lets a CDN/browser/service worker serve client-side navigations (usually far more frequent than hard loads), and *missing* `private, no-store` there is how a shared cache leaks one user's payload to another. `Set-Cookie` is processed on fetch responses too, and `status()` is what monitoring and CDNs see. In practice the cache/cookie/status family is nearly always "both transports" (→ lock); genuinely document-only headers are the document-processing kind — CSP, `Link` preloads, `Refresh` — which the browser ignores on fetch responses anyway.

They mutate a response-`Headers` object in the request store. At finalize these are **merged over** whatever the render produced (react-router's `match.headers`, content-type, etc.): `set` replaces, `append` adds, `delete` removes. `Set-Cookie` is always append-semantics (§3.3).

### 3.2 `status`

```tsx
import { status } from '@/server/request'

export default function NotFound() {
    status(404)
    return <p>Not found</p>
}
```

An explicit `status()` **wins** over the status react-router computed for the match. Without it, react-router's status passes through untouched.

### 3.3 `setCookie` / `deleteCookie`

```tsx
import { renderLock, setCookie } from '@/server/request'

export default async function Page() {
    const experiment = await renderLock(async () => {
        const experiment = await assignExperiment()
        setCookie('exp', experiment.bucket, { path: '/', maxAge: 60 * 60 * 24, httpOnly: true, sameSite: 'lax' })

        return experiment
    })

    return <Experiment bucket={experiment.bucket} />
}
```

Serialized with the [`cookie`](https://www.npmjs.com/package/cookie) package (the same one `universal-cookie` uses to parse) and **appended** — multiple `setCookie` calls produce multiple `Set-Cookie` lines, and the express layer copies them with append semantics too. `deleteCookie(name, options)` is `setCookie` with an epoch expiry; pass the same `path`/`domain` the cookie was set with.

### 3.4 `renderLock`

The escape hatch for the two gap cases in §2 — hold the response open across an `await`. Two forms, **fully equivalent** — pick by taste:

```tsx
import { renderLock, setHeader } from '@/server/request'

// callback form — releases automatically when the callback settles (even on throw)
const posts = await renderLock(async () => {
    const posts = await fetchPosts()
    setHeader('X-Posts-Total', String(posts.length))

    return posts
})
```

```tsx
// bare form — you own the release (wrap in try/finally if the await can throw)
const unlock = renderLock()
const posts = await fetchPosts()
setHeader('X-Posts-Total', String(posts.length))
unlock()
```

There is nothing special about passing the async work *into* the lock — the lock doesn't watch your promise. All that matters is **when `renderLock()` itself runs**: it must be called *before the component's first `await`*, so the lock is counted while the response is still held (§4.4 explains the guarantee). Both forms above do that — `renderLock(...)` executes synchronously in the component's prelude; the slow work then happens inside an already-open lock window.

Which is also why this ordering is **broken**:

```tsx
// ⛔ WRONG — no lock is held during the fetch. The response flushes while
// fetchPosts is in flight; by the time renderLock runs there is nothing left
// to hold, and the setHeader is silently dropped (§5).
const posts = await fetchPosts()
await renderLock(() => setHeader('X-Posts-Total', String(posts.length)))
```

(On a document request outside `<Suspense>` this happens to work — the Fizz shell blocks the response anyway (§2) — but it loses the header under `<Suspense>` and on every `.rsc` navigation. Don't rely on it.)

One nuance of the callback form: release is *deferred by one macrotask* after the callback settles (§4.2), so a synchronous `setHeader` immediately after the `await renderLock(...)` line still makes it out. That's a chaining affordance, not a pattern to lean on — when a mutation derives from the fetched data, put it inside the callback (or use the bare form).

**The one rule: take the lock before your component's first `await`.** Locks nest — the response flushes when the last one releases. A safety timeout (10 s) logs a warning and flushes anyway if a lock is never released, so a bug degrades to "headers sent late/unmodified", not a hung request.

## 4. How it works

Three small pieces, fitted to the store and pipeline this repo already has: mutable response state in per-request context, a counting semaphore, and a buffered read loop between the render stream and the socket.

### 4.1 Response state rides the request store

The AsyncLocalStorage store (docs/rsc.md §7) gains two fields:

```ts
response: {
    status?: number
    statusText?: string
    headers: Headers        // response headers to merge at finalize
}
lock: {
    count: number
    gate: Promise<void> | null   // pending while count > 0
    release: () => void
}
```

All API functions are thin wrappers over `storage.getStore()` — which is why they work at any depth, in server functions, after any number of `await`s: the store propagates with the async context (and the whole render, both stages, now runs inside one `storage.run` scope in `handler`).

### 4.2 The lock is a counting semaphore

`renderLock()` increments `lock.count` and lazily creates the shared `gate` promise. `unlock` is idempotent and **defers its decrement by one `setImmediate`**:

```ts
const unlock = () => {
    setImmediate(() => {
        if (--lock.count === 0) { lock.release(); lock.gate = null }
    })
}
```

The deferral is what makes locks *chainable*: when `await renderLock(fn)` resolves, your continuation runs on the microtask queue — **before** the scheduled decrement — so a follow-up `renderLock()` keeps the gate closed with no gap. It is also why "mutate right after the `await`" in §3.4 works: those synchronous calls run before the decrement lands.

### 4.3 The finalize loop

[`finalize.ts`](../src/server/middleware/render/finalize.ts) (where the design credit lives), called as the last step of `handler` — inside the bundle, inside `storage.run`. (It cannot live in the express middleware: the express process and the rspack server bundle are **separate module graphs** — `getRender` loads the bundle via `require`/`requireFromString` — so they hold different `storage` instances. Express-land code calling `storage.getStore()` would see `undefined`.)

```ts
export const finalizeResponse = async (response: Response, store: Store): Promise<Response> => {
    if (!response.body) return applyStore(response, store)   // redirects etc.

    const reader = response.body.getReader()
    const buffered: Uint8Array[] = []
    const interrupt = immediateTick()                        // setImmediate, fires once
    let read: Promise<ReadResult> | null = null

    while (true) {
        read ??= reader.read()
        const winner = await Promise.race([read, store.lock.gate?.then(() => GATE) ?? interrupt])
        if (winner === GATE) continue                        // re-race: a chained lock may have re-armed
        if (winner === INTERRUPT) break                      // idle tick, no lock held → flush now
        read = null                                          // the read settled — consume it
        if (winner.done) break
        buffered.push(winner.value)
    }

    // headers/status snapshot happens HERE — after locks, before first byte
    return applyStore(makeResponse(buffered, read, reader), store)
}
```

Reading it against the race's three outcomes:

- **A chunk wins** → buffer it, keep looping. While a lock is held this is the steady state: render output accumulates in `buffered`, nothing reaches the socket.
- **The gate wins** → a lock just released. Loop around and re-evaluate: either a chained lock re-armed the gate (keep waiting) or `gate` is `null` and the already-resolved `interrupt` wins the next race (flush).
- **The interrupt wins** → one `setImmediate` tick passed with no lock held and no chunk pending. Flush.

One subtlety: an in-flight `reader.read()` must **carry over** (`read ??=`) — when the gate or interrupt wins the race, the pending read isn't lost, it's the first thing the output stream awaits. The output is a new `ReadableStream` that enqueues `buffered` in `start()` and delegates `pull()` to the reader, so **backpressure is preserved** — express's `.pipe` drives it exactly as before.

`applyStore` builds the final `Response`: `store.response.status ?? response.status`, headers = the render's headers with the store's merged over them (`set` semantics, except `Set-Cookie` which appends), and hands the express layer a response it can treat exactly as today — the middleware's only change is copying `Set-Cookie` with `res.append`.

### 4.4 Why a lock taken before the first `await` can never race

The guarantee comes from Flight's scheduling, verified in `react-server-dom-rspack`:

```js
function startWork(request) {
    scheduleMicrotask(() => requestStorage.run(request, performWork, request))
    …
}
```

`renderToReadableStream` queues the first render pass **as a microtask** at call time — inside `generateResponse`, deep inside `await fetchServer(request)`. `performWork` synchronously runs the prelude of every server component reachable without awaiting a parent; any `renderLock()` there increments the counter. The finalize loop starts strictly later (after the `fetchServer`/`renderHTML` promise chains — later microtasks by FIFO order) and its no-lock exit needs a full `setImmediate` macrotask on top. By then, every prelude lock is counted.

The corollary is the rule in §3.4: a lock taken *after* an `await` sits behind your data, not in the prelude — nothing stops the idle tick from firing first. (On document requests you get away with it outside `<Suspense>`, because the Fizz shell blocks `handler` anyway — but don't build on that; write components that are correct on `.rsc` navigations too.)

Components whose *parent* suspends before rendering them get their locks registered transitively: the parent's own await either happens under a lock (extending the window) or the child's rows were never going to make the first flush anyway.

## 5. Rules & caveats

- **Lock before the first `await`.** The only ordering rule (§4.4). Everything before the first `await` — including `setHeader` itself — is race-free even without a lock.
- **A lock delays TTFB for the whole response.** That's the feature — the client waits on your data before the first byte. Use it for decisions worth blocking on (cache policy, auth cookies), not around every fetch. The no-lock overhead of finalize is one `setImmediate` tick (~0 ms).
- **Buffering means memory.** While locked, Flight/Fizz output accumulates in an array. For header-decision windows (tens–hundreds of ms) this is a few KB; don't hold a lock across a 30 s job.
- **The timeout is a safety valve, not an API.** 10 s (`LOCK_TIMEOUT` in `finalize.ts`), logs a warning, then flushes with whatever headers exist. A leaked `unlock` never hangs a response — and if the stream *completes* while a lock is still held, the loop flushes immediately (every component has settled, so no further mutation can come), meaning a leak on a fast page costs nothing at all.
- **After the flush, mutations are silently lost.** Same as every server runtime; there is no error because components legitimately re-run in contexts where headers already went out (a locked sibling flushed first, deep Suspense content, …).
- **`status()` vs react-router.** Explicit `status()` wins; otherwise react-router's match status (404 for no match, action status, …) passes through. Don't `status(302)` by hand — use `redirect()` from `@/server/navigation` (docs/rsc.md §11), which react-router turns into the right transport per request type.
- **Client components can't do any of this** — same boundary as `request()` (docs/rsc.md §7): `server-only` fails the build, the invariant catches runtime misuse.
- **Actions get it too.** `POST` requests run through the same `handler` → finalize path, so `setCookie` inside a `'use server'` function lands on the action response — no lock needed for anything done before the action returns, since the action completes before react-router even starts rendering the revalidated tree.

## 6. Verified behaviour

All of the following was exercised against the dev server (July 2026), with the API dogfooded in three places: [`not-found`](../src/client/pages/not-found/index.tsx) (`status(404)`), [`private`](../src/client/pages/private/index.tsx) (`setHeader` before a redirect), and [`Posts`](../src/client/components/home/posts/index.tsx) (`renderLock` + data-derived header inside `<Suspense>`).

- **The hard case works.** `Posts` — under `<Suspense>`, awaiting an external fetch — sets `X-Posts-Total` from the fetched data, and the header arrives on **both** transports: the document (`curl -si /` → `x-posts-total: 200`) and the data request (`curl -si /.rsc` → same). The latter is impossible without the lock: Flight rows had already been produced and were sitting in the finalize buffer.
- **`status(404)` on the catch-all route** turns the previously-200 not-found page into a real 404, on `/missing` and `/missing.rsc` alike.
- **Mutations survive onto redirect responses.** `/private` without a session returns `307` + `location: /` *and* the `cache-control: private, no-store` set before `redirect()` threw — the body-`null` finalize path merges store state onto whatever response the render produced.
- **Multiple cookies don't fold.** Two `setCookie` calls produced two `Set-Cookie` lines (`first=1; Path=/` and `second=2; Path=/; HttpOnly`) through the express copy (`getSetCookie()` → `res.setHeader('set-cookie', string[])`).
- **A completed stream beats a held lock.** A bare `renderLock()` leaked in a fully-sync page added zero delay: the Fizz stream completed, the loop saw `done` and flushed. Correct, since every component had settled — no mutation could come anymore.
- **The timeout fires and degrades gracefully.** A locked component sleeping 12 s under `<Suspense>` (against the 10 s `LOCK_TIMEOUT`): TTFB was 10.03 s with `warn: renderLock held for over 10000ms — flushing response headers` in the server log, the body completed at 12.03 s (the suspended content still streamed in), and a `setHeader` made *after* the flush was silently dropped — exactly the documented post-flush semantics.
- **Streaming and hydration are unaffected.** Full document renders byte-identical in structure (buffer → passthrough preserves chunk boundaries via `pull()` delegation), the browser hydrates with zero console errors, and client-side navigation (`/about.rsc`, `_.rsc`) works — the finalized `Response` is indistinguishable from the old direct one to everything downstream.
