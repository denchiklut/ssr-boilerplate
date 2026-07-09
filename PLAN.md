# Server Components Architecture

> Implemented July 2026 using Rspack v2's native RSC support and React Router's
> (unstable) RSC APIs. This document describes the architecture as built.

## Goal

React Server Components matching the Next.js App Router model:

- All components are **server components by default** (run only on the server,
  excluded from the client bundle)
- `'use client'` at the top of a file opts that module into the **client bundle**
  (interactive: hooks, effects, browser APIs)
- No dedicated `*.entry.ts` files, no folder restructuring — the existing entries
  and file layout are preserved

## Key building blocks

| Piece | What it provides |
|---|---|
| `@rspack/core` v2 `experiments.rsc.createPlugins()` | `ServerPlugin`/`ClientPlugin` pair that syncs the two compilers, generates client-reference manifests, wires module maps |
| `builtin:swc-loader` + `rspackExperiments.reactServerComponents` | Transforms `'use client'` / `'use server'` directives |
| Module **layers** (`Layers.rsc`, `Layers.ssr`) | One `node` compiler hosts both the react-server environment (RSC payload) and the SSR environment (HTML) |
| `react-server-dom-rspack` | React's Flight bindings for Rspack (payload serialization on the server, deserialization for SSR/hydration) |
| `react-router` unstable RSC APIs | `matchRSCServerRequest` (route matching + payload), `routeRSCServerRequest`/`RSCStaticRouter` (SSR), `RSCHydratedRouter` (browser) |

## Request flow

```
Request → Express (dist/server, unchanged express.config)
  → render middleware (src/server/middleware/render/index.tsx)
      builds a Fetch Request + per-request meta (nonce, cookie, css links, bootstrap scripts)
      calls handler() from the built app.server.js bundle
  → [Layers.rsc]  rsc.tsx: matchRSCServerRequest(routes) → RSC payload stream
      server components execute here (react-server conditions, async/await allowed)
      'use client' imports become client references
  → [Layers.ssr]  ssr.tsx: routeRSCServerRequest + RSCStaticRouter
      deserializes the payload, renderToReadableStream → HTML
      the flight payload is injected into the HTML stream (self.__FLIGHT_DATA)
  → Express pipes the Response body to res
Browser
  → src/client/index.tsx: getRSCStream() → createFromReadableStream → hydrateRoot(RSCHydratedRouter)
  → navigation / server actions fetch `.rsc` payloads (handled by the same handler)
```

## The three compilers (rspack.config.ts — unchanged shape)

- **express** (`src/server/index.ts`) — untouched; still externalizes `app.server.js`
- **client** (`src/client/index.tsx`) — + `rscClientPlugin`; hydrates from the flight stream
- **server** (entry `src/server/middleware/render/rsc.tsx` → `js/app.server.js`)
  - `rsc.tsx` is assigned `Layers.rsc` (+ `react-server` condition for itself and
    everything it imports); `ssr.tsx` is pinned to `Layers.ssr`
  - no `nodeExternals`: react/react-router/react-server-dom-rspack must be *bundled*
    so the `react-server` condition applies per-layer
  - `LimitChunkCountPlugin` keeps it a single file → `require-from-string` dev reload
    keeps working

## Routes (src/client/components/@shared/app/index.tsx)

Routes are a `unstable_RSCRouteConfig` config: root (Html + Providers, server) →
layout (`'use client'`: nav, PWA hook, error boundary) → pages (server components,
`lazy()`-loaded). Per-request data (nonce, CSS link tags, cookie header) flows via
`RouterContextProvider` → root loader → `loaderData`.

## Client boundaries in this repo

`'use client'`: `@shared/layout`, `@shared/query`, `@shared/app/providers`,
`home/state`, `home/cookie-demo`. Everything else (Html, Page, pages, Home, Demo,
Posts) is server-only — e.g. `Posts` is an async server component that fetches
directly with `await`.

## Dev mode

- Same flow as before: nodemon runs the express bundle; the express server compiles
  `[client, server]` in-process via `@rspack/dev-middleware` + `webpack-hot-middleware`
- Client components hot-update via react-refresh as usual
- Server-component changes fire `ServerPlugin.onServerComponentChanges` →
  `rsc.plugin.ts` re-publishes an `rsc-update` SSE event → the browser reloads;
  the next request `require-from-string`s the fresh `app.server.js`

## Known limitations

- `pnpm spa` (pure CSR) is incompatible with RSC (no server to produce the payload)
  and is currently non-functional
- react-router RSC APIs are `unstable_`-prefixed; expect churn on upgrades
- The injected flight `<script>` chunks carry no nonce (react-router's internal
  injector doesn't support one); fine while the app sets no CSP header
- The client compiler can no longer be built standalone (`--configName=client`
  deadlocks — the RSC plugin pair requires client+server in one multi-compiler run)
- Wildcard route renders the not-found page with HTTP 200 (same as the previous
  StaticRouter setup)
- Server actions (`'use server'`) are wired end-to-end by the toolchain but no
  action is used in the app yet
