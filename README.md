# SSR Boilerplate

[![license](https://img.shields.io/github/license/nhn/tui.editor.svg)](https://github.com/denchiklut/ssr-boilerplate/blob/main/LICENSE) [![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg)](https://github.com/denchiklut/ssr-boilerplate/issues)

A production-shaped **React Server Components** boilerplate: **rspack v2** (native RSC support — layers + `experiments.rsc.createPlugins()`), **react-router v8** (RSC APIs) and **Express 5**, with streaming SSR end to end.

Feel free to suggest improvements.

> 📖 **[docs/rsc.md](docs/rsc.md)** — the full architecture write-up: build layers, the two-stage render pipeline, asset injection, the [request](docs/rsc.md#7-request-api--request) & [response](docs/rsc.md#8-response-api--response) APIs, HMR bridge, and the invariants you must not break. Read it before changing anything in `rspack/` or `src/server/middleware/render/`.

## Features

-   [x] `RSC` — server components, server functions (`'use server'`), form actions
-   [x] Streaming `SSR` — Flight render → Fizz HTML with the payload inlined
-   [x] Request & response APIs — `request()` reads url/headers/cookies; `response()` writes `headers`/`cookies`/`status`, with `renderLock` holding the flush open across `await`s
-   [x] `HMR` — react-refresh for client components, router revalidation for server components
-   [x] Code splitting (lazy routes + client-reference chunks)
-   [x] Runtime env vars (build once, deploy anywhere)
-   [x] Strict-CSP friendly (per-request nonce on every script/style)
-   [x] `PWA` + workbox
-   [x] `Polyfills`
-   [x] [Svgr](https://react-svgr.com/docs/webpack/) support for `.icon.svg` files
-   [x] local `https`

### Other branches

-   Pre-RSC `renderToPipeableStream` setup: [feat/pipable-stream](https://github.com/denchiklut/ssr-boilerplate/tree/feat/pipable-stream)
-   Suspense + CSS-in-JS ([MUI](https://mui.com)) example: [feat/suspense-mui](https://github.com/denchiklut/ssr-boilerplate/tree/feat/suspense-mui)
-   I wrote a small article about `SSR with React 18` — [post on medium](https://medium.com/@ollylut/ssr-with-react-18-c8961d764a94)

## How it works (60 seconds)

Every document request runs a **two-stage pipeline inside one Node process** — two React runtimes, one bundle, split by rspack layers:

1. **Flight render** ([`rsc.tsx`](src/server/middleware/render/rsc.tsx), `react-server` layer) — server components execute *here and nowhere else*; react-router's `matchRSCServerRequest` produces the RSC payload.
2. **HTML render** ([`ssr.tsx`](src/server/middleware/render/ssr.tsx), SSR layer) — the payload is decoded and streamed to HTML by Fizz, with the raw Flight chunks interleaved as inline `<script>`s so the browser hydrates without a second round trip.

The same `handler` also answers `.rsc` navigation requests, `.manifest` route-discovery requests and server-function `POST`s. The whole document — `<html>` included — is a server component ([`Html`](src/client/components/@shared/html/index.tsx)); there is no HTML template.

## Request & response APIs

Per-request state flows through a single `AsyncLocalStorage`, so any server component — at any depth, and inside `'use server'` functions — reaches it directly, with no prop-drilling and no loader indirection. Two mirrored accessors, both synchronous:

**`request()` — read what came in** ([docs/rsc.md §7](docs/rsc.md#7-request-api--request))

```tsx
import { request } from '@/rsc'

export function Header() {
	const { url, headers, cookies, nonce } = request()

	return <span>{url.pathname}</span>
}
```

**`response()` — write what goes out** ([docs/rsc.md §8](docs/rsc.md#8-response-api--response))

```tsx
import { response } from '@/rsc'

export default async function ProductPage({ params }) {
	const { headers, cookies, status, renderLock } = response()

	// renderLock holds the status/headers flush open across the await, so a
	// header derived from fetched data still makes it out — on the streamed
	// document *and* on .rsc client navigations
	const product = await renderLock(async () => {
		const product = await getProduct(params.id)
		headers.set('Cache-Control', product.draft ? 'private, no-store' : 's-maxage=300')

		return product
	})

	if (!product) status(404)

	return <Product data={product} />
}
```

The render lock is the part with no equivalent in Next.js, where response mutation is confined to middleware/route handlers that run *before* the page and can't see its data. Rendering never pauses — only the flush of status + headers to the socket is held, while output buffers. Details, rules and the timing guarantee: [docs/rsc.md §8](docs/rsc.md#8-response-api--response).

## Getting started

### Step 1. Install

Requires Node (see [.nvmrc](.nvmrc)) and pnpm.

```bash
pnpm i
```

### Step 2. Environment variables

Copy [.env.example](.env.example) to `.env` (git-ignored) and adjust.

**Adding a new variable:**

1. Add it to `.env`
2. For TS completion and validation add it to `envSchema` in [src/common/env/index.ts](src/common/env/index.ts)
3. If the variable must be readable from **both** client & server, prefix its name with `CLIENT_`
4. The `CLIENT_` prefix itself can be changed in [rspack/plugins/define.plugine.ts](rspack/plugins/define.plugine.ts)
5. Read it with `getENV('MY_VAR')` — the value is cast to the type declared in `envSchema` (string/number/boolean) and, on the client, reading a non-`CLIENT_` variable throws

> Unlike Next.js, env vars are **not baked into the bundle** at build time — they're serialized per request into `window.env_vars`. Build once (e.g. for staging) and reuse the exact same artifact in production.

**Global variables** available everywhere: `IS_DEV`, `IS_PROD`, `IS_SERVER`.

### Step 3. Https (optional)

1. In [setup.sh](setup.sh) change the `domain` variable to your domain
2. Run `pnpm setup`
3. Add `CLIENT_HOST=https://<YOUR-domain>:PORT` to `.env`

### Step 4. Run

Development (express in watch mode + in-process client/server compilers with HMR):

```bash
pnpm dev
```

Production (clean build of all three compilers, then serve):

```bash
pnpm start
```

The app starts on `http://localhost:3000`.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | dev server — express rebuild + nodemon, client & RSC compilers run in-process |
| `pnpm start` | `rimraf dist` → production build (all three configs) → `node dist/server` |
| `pnpm test` | jest + coverage |
| `pnpm ts-check` | `tsc --noEmit` |
| `pnpm lint` | biome (scripts) + stylelint (styles), both with `--fix` |
| `pnpm setup` | local https certs via mkcert + `/etc/hosts` alias |

## Project structure

```
rspack/
  configs/       express · client · server(RSC render bundle) — one multi-compiler
  plugins/       rsc, hmr, refresh, stats, css, pwa, define…
  rules/         swc loaders (RSC transform, layer-aware React Compiler)
src/
  client/
    components/  @shared (html, app, layout, page, error…) + feature components
    pages/       lazy route modules (home, about, not-found)
    index.tsx    hydration entry — Flight replay → hydrateRoot(document)
  common/        env, logger (winston/console), path helpers — isomorphic
  server/
    middleware/  render (rsc.tsx · ssr.tsx · chunk-extractor), hmr, nonce, logger…
    request/     AsyncLocalStorage store behind `request()` / `response()`
    router/      static · version · health · pwa · app catch-all
docs/rsc.md      architecture reference (incl. request & response APIs)
```

Path aliases (`@/common`, `@/shared/*`, `@/pages/*`, `@/components/*`, `@/api`, `@/utils`, `@/server/*`) are declared in [tsconfig.json](tsconfig.json).

## Gotchas

The short list — full reasoning in [docs/rsc.md §11](docs/rsc.md#11-gotchas):

1. **Never build the client config alone.** `rspack --configName=client` deadlocks: the RSC plugin pair synchronizes the client and server compilers, so they must run in the same multi-compiler build.
2. **Never add `webpack-node-externals` to the server (render) config.** React, react-dom, react-router and react-server-dom-rspack must be *bundled* for the per-layer `react-server` condition to resolve at all.
3. **Don't remove the `vendorRSC` rule.** react-router ships a real `'use client'` directive inside its dist files, and loaders don't run over `node_modules` by default — without the transform the server build dies with `useEffect not found in react`.
4. **React Compiler stays off inside the RSC layer.** Compiled server components crash the Flight render; prod redacts the error into a useless empty digest.
5. **`request()`/`response()` are RSC-scope only.** Client components — including during SSR — must receive request data as props from a server component.
6. **All CSS must stay in the `main` chunk group**, otherwise it never reaches the SSR'd `<head>` (→ FOUC). Reach for `preinit()`, not extractor changes, if that ever breaks.
7. **Pure SPA/CSR mode is not supported** under RSC.
