# Repro — `decodeAction` / `decodeFormState` never receive the server manifest

Minimal-ish reproduction for [rspack#14950](https://github.com/web-infra-dev/rspack/issues/14950).

`react-server-dom-rspack` lost the manifest-injecting wrappers for `decodeAction` and
`decodeFormState` when its packaging changed. The package's own source still wraps both
correctly; the published artifact does not, and instead re-exports React's upstream
signatures, which require the caller to pass the manifest.

react-router 8 calls them as `decodeAction(formData)` and `decodeFormState(result, formData)`,
so that argument arrives `undefined`, `resolveServerReference` evaluates `undefined[actionId]`,
and **every no-JavaScript form-action POST returns HTTP 400**.

Server actions submitted *with* JavaScript keep working, because that path goes through
`decodeReply` + `loadServerAction`, both of which read the manifest themselves. That is why
this survives normal development — you only hit it with JS disabled or not yet loaded.

## Reproduce

```bash
pnpm install && cp .env.example .env && pnpm dev
```

Then, in a second terminal:

```bash
pnpm repro
```

Expected output — the script submits the `useFormStatus` demo form exactly as a browser
would with JavaScript disabled (a plain multipart POST carrying React's hidden
`$ACTION_ID_<hash>` field):

```
POST / → 400 Bad Request (32ms)

✗ REPRODUCED — expected 200.
```

The dev server log shows:

```
TypeError: Cannot read properties of undefined (reading '<action-hash>')
```

It reproduces in production builds too:

```bash
pnpm prod:build && NODE_ENV=production node dist/server
```

then `pnpm repro` again — so it is not an artifact of the dev server re-evaluating
the render bundle per request.

### Reproduce by hand instead

1. Open <http://localhost:3000> and disable JavaScript for the page.
2. Submit the **useFormStatus demo** form.
3. The browser shows an error response instead of the page re-rendering.

With JavaScript enabled, the same form submits fine — as does the **'use server' demo**
button next to it, which calls a server function directly.

## Where it happens

[`src/server/middleware/render/rsc.tsx`](src/server/middleware/render/rsc.tsx) passes all four
decode functions straight from `react-server-dom-rspack/server.node` into react-router's
`unstable_matchRSCServerRequest`:

```ts
matchRSCServerRequest({
    decodeReply,      // fine — shipped build reads the manifest itself
    loadServerAction, // fine — shipped build reads the manifest itself
    decodeAction,     // 400s — shipped build expects (body, serverManifest)
    decodeFormState,  // 400s — shipped build expects (actionResult, body, serverManifest)
    …
})
```

Passing them through unwrapped is what the package's own source asks for: it wraps both,
injecting the manifest so callers don't have to —
[`src/server.node.ts`](https://github.com/SyMind/react-server-dom-rspack/blob/main/src/server.node.ts):

```ts
export function decodeAction(body: FormData): Promise<() => unknown> | null {
  return ReactServer.decodeAction(body, __rspack_rsc_manifest__.serverManifest);
}

export function decodeFormState(
  actionResult: unknown,
  body: FormData,
): Promise<unknown | null> {
  return ReactServer.decodeFormState(
    actionResult,
    body,
    __rspack_rsc_manifest__.serverManifest,
  );
}
```

The published package no longer does. Since `0.0.1-beta.1` it ships React's vendored bundle
directly — `server.node.js` is a thin re-export of
`cjs/react-server-dom-rspack-server.node.{production,development}.js` with no wrapper layer —
so consumers get React's upstream signatures instead.

### Regression timeline

| Version | Published | `decodeAction` as shipped | `.d.ts` shipped |
|---|---|---|---|
| `0.0.1-alpha.8` | 2026-01-04 | `(body)` — injects the manifest itself ✅ | 10 files |
| `0.0.1-beta.1` | 2026-02-26 | `(body, serverManifest)` ❌ | none |
| `0.0.2` | 2026-03-14 | `(body, serverManifest)` ❌ | none |
| `19.3.0-canary-0280004e-20260417` | 2026-04-17 | `(body, serverManifest)` ❌ | none |

`decodeFormState` regressed identically. Other manifest-consuming exports kept their wrappers
across the same transition — `decodeReply(body, options)`,
`decodeReplyFromAsyncIterable(iterable, options)`, `decodeReplyFromBusboy(busboyStream, options)`,
`loadServerAction(actionId)` and `renderToReadableStream` all still self-serve
`__rspack_rsc_manifest__`. So the shipped package is internally inconsistent about who supplies
the manifest, and it is **still broken in the newest published version** — upgrading the pin
does not help.

Dropping the `.d.ts` files in the same transition is what makes it silent: consumers now
hand-write the signatures, so a wrong guess fails at runtime instead of at build time.

## Workaround

Wrapping the two at the call site fixes it. This branch deliberately leaves them unwrapped so
the bug reproduces — to apply the workaround, edit
[`src/server/middleware/render/rsc.tsx`](src/server/middleware/render/rsc.tsx):

```ts
// src/server/middleware/render/rsc.tsx
const decodeFormAction: DecodeActionFunction = formData =>
    decodeAction(formData, __rspack_rsc_manifest__.serverManifest)

const decodeActionFormState: DecodeFormStateFunction = (actionResult, formData) =>
    decodeFormState(actionResult, formData, __rspack_rsc_manifest__.serverManifest)

const fetchServer = (request: Request) =>
    matchRSCServerRequest({
        decodeReply,      // unchanged — reads the manifest itself
        loadServerAction, // unchanged — reads the manifest itself
        decodeAction: decodeFormAction,
        decodeFormState: decodeActionFormState,
        …
    })
```

`DecodeActionFunction` / `DecodeFormStateFunction` are react-router's
`unstable_Decode*Function` types. `__rspack_rsc_manifest__` is a bundler global injected by
rspack's RSC ServerPlugin — it needs an ambient declaration, which this repo keeps in
[`@types/rsc/index.d.ts`](@types/rsc/index.d.ts) alongside the module declarations for
`react-server-dom-rspack` (the package ships no types of its own).

After that, `pnpm repro` reports:

```
POST / → 200 OK (1526ms)

✓ Not reproduced — the action executed (>1s, it sleeps 1.5s).
```

## Suggested fix

Restore parity with `src/server.node.ts` in the published build, so `decodeAction` and
`decodeFormState` inject `__rspack_rsc_manifest__.serverManifest` like every other export,
and restore the `.d.ts` files so this class of mismatch is a compile error rather than a
runtime 400.

## Environment

- `react-server-dom-rspack@0.0.2`, `@rspack/core@2.1.5`, `react-router@8.2.0`, `react@19.2.7`
- Architecture notes for this app: [`docs/rsc.md`](docs/rsc.md) (§3.3 covers this call site)
