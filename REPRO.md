# Repro — `decodeAction` / `decodeFormState` never receive the server manifest

Minimal-ish reproduction for [rspack issue TODO](https://github.com/web-infra-dev/rspack/issues).

`react-server-dom-rspack@0.0.2` is inconsistent about who supplies the server manifest.
Most manifest-consuming exports read `__rspack_rsc_manifest__` themselves — but
`decodeAction(body, serverManifest)` and `decodeFormState(actionResult, body, serverManifest)`
still carry React's upstream signature and expect the caller to pass it.

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
    decodeReply,      // ✅ reads __rspack_rsc_manifest__.serverManifest itself
    loadServerAction, // ✅ reads __rspack_rsc_manifest__.serverManifest itself
    decodeAction,     // ❌ wants (body, serverManifest)
    decodeFormState,  // ❌ wants (actionResult, body, serverManifest)
    …
})
```

Signatures in `node_modules/react-server-dom-rspack/cjs/react-server-dom-rspack-server.node.production.js`:

| Export | Line | Signature | Manifest |
|---|---|---|---|
| `decodeAction` | 3101 | `(body, serverManifest)` | **caller must pass** |
| `decodeFormState` | 3121 | `(actionResult, body, serverManifest)` | **caller must pass** |
| `decodeReply` | 3138 | `(body, options)` | reads the global |
| `decodeReplyFromAsyncIterable` | 3154 | `(iterable, options)` | reads the global |
| `decodeReplyFromBusboy` | 3181 | `(busboyStream, options)` | reads the global |
| `loadServerAction` | 3272 | `(actionId)` | reads the global |

## Workaround

Wrapping the two at the call site fixes it — this branch deliberately leaves them unwrapped
so the bug reproduces:

```ts
const decodeFormAction = formData =>
    decodeAction(formData, __rspack_rsc_manifest__.serverManifest)

const decodeActionFormState = (actionResult, formData) =>
    decodeFormState(actionResult, formData, __rspack_rsc_manifest__.serverManifest)
```

After that, `pnpm repro` reports:

```
POST / → 200 OK (1526ms)

✓ Not reproduced — the action executed (>1s, it sleeps 1.5s).
```

## Suggested fix

Have `decodeAction` and `decodeFormState` read `__rspack_rsc_manifest__.serverManifest` like
the rest of the package, keeping the explicit argument as an optional override. Shipping
`.d.ts` files would also make this class of mismatch a compile error — the package currently
ships none, so every consumer hand-writes the signatures and a wrong guess is silent.

## Environment

- `react-server-dom-rspack@0.0.2`, `@rspack/core@2.1.5`, `react-router@8.2.0`, `react@19.2.7`
- Architecture notes for this app: [`docs/rsc.md`](docs/rsc.md) (§3.3 covers this call site)
