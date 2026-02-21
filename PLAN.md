# Server Components Implementation Plan

## Goal

Implement a React Server Components (RSC) architecture that mirrors Next.js App Router:
- All components are **server components by default** (run only on the server, excluded from client bundle)
- `'use client'` at the top of a file opts that module into the **client bundle** (interactive, hooks, effects)

---

## Current Architecture (baseline)

```
Request → Express
  → render middleware
  → renderToPipeableStream(<App />, ...)   ← react-dom/server
  → HTML stream to browser
  → browser loads client bundle
  → hydrateRoot(document, <AppContainer />) ← react-dom/client
```

**Problem**: Both `server.config.ts` (SSR bundle) and `client.config.ts` (browser bundle)
include **all components**. There's no server/client isolation at the module level.

---

## Target Architecture

```
Request → Express
  → [RSC render] renderToPipeableStream(Root, clientManifest)  ← react-server-dom-webpack/server
      └─ server components run (async, DB/fetch access)
      └─ 'use client' modules are replaced with client references
  → RSC payload stream
  → [SSR HTML] createFromNodeStream(rscStream) + renderToPipeableStream ← react-dom/server
  → HTML + inline RSC payload → browser
  → [Hydration] createFromReadableStream(rscStream) + hydrateRoot    ← react-server-dom-webpack/client
```

**Key invariant**: Server component source files never appear in the client bundle.
Only `'use client'` files (and their transitive imports) are bundled for the browser.

---

## Build Pipeline Changes

```
Before: [express.config] + [client.config] + [server.config]
After:  [express.config] + [client.config] + [server.config] + [rsc.config]  ← NEW
```

### New: `rspack/configs/rsc.config.ts`

A dedicated RSC server bundle:
- **Entry**: `src/app/root.tsx` (new server component root)
- **Target**: `node`
- **resolve.conditionNames**: `['react-server', 'node', 'require']`
  - This selects the React server-side implementations (no hooks, no useState)
- **Loader**: `use-client.loader` transforms `'use client'` files into client reference stubs
- **Output**: `dist/rsc/bundle.js`
- **Externals**: `nodeExternals()` + keep `react-server-dom-webpack` external

### Modified: `rspack/configs/client.config.ts`

- Add `use-client.loader` to **register** `'use client'` files as chunk entry points
- Add `ClientReferenceManifest` plugin to emit `react-client-manifest.json`
- Use `moduleIds: 'deterministic'` for stable IDs required by the RSC manifest

### Modified: `rspack/configs/server.config.ts`

- Kept mostly intact — this SSR bundle is now used for the **HTML rendering pass**
  using the RSC payload as input (rather than rendering the App directly)
- OR: removed entirely if RSC server handles HTML rendering natively via `renderToString`

### Unchanged: `rspack/configs/express.config.ts`

No changes needed.

---

## New Files to Create

### 1. `rspack/loaders/use-client.loader.ts`

A Rspack/webpack loader that reads each file and:

**In RSC server build** (detected via `IS_RSC_BUILD` env flag passed via `DefinePlugin`):
```
// Input: src/components/home/state/index.tsx
'use client'
import { useState } from 'react'
export const State = () => { const [c, setC] = useState(0); ... }

// Output (stub — client reference):
import { createClientReference } from 'react-server-dom-webpack/server'
export const State = createClientReference('src/components/home/state/index.tsx#State')
```

**In client build**: pass through unchanged — but calls a side-effect that registers
the module in the manifest.

**In server SSR build**: pass through unchanged — 'use client' components still render
their HTML for the initial page load.

### 2. `rspack/plugins/client-reference-manifest.plugin.ts`

A Rspack plugin that runs after the **client compilation** completes:
- Walks the module graph and collects all modules whose source starts with `'use client'`
- Builds a manifest mapping `moduleId → { id, chunks[], name }` for each export
- Writes `dist/client/react-client-manifest.json`
- Format mirrors what `react-server-dom-webpack` expects:
  ```json
  {
    "src/components/home/state/index.tsx": {
      "State": { "id": "src/components/home/state/index.tsx", "chunks": ["chunk-abc.js"], "name": "State" }
    }
  }
  ```

### 3. `src/app/root.tsx` (Server Component Root)

The new async server component root — replaces the current `App` component as the RSC entry:
```tsx
// No 'use client' → this is a server component
import { Html } from '@/shared/html'     // 'use client' → client reference in RSC build
import { Layout } from '@/shared/layout' // 'use client'
import { routes } from './routes'

export async function Root({ nonce, cookies, linkTags }) {
  return (
    <Html nonce={nonce} linkTags={linkTags}>
      <Router>
        {routes}
      </Router>
    </Html>
  )
}
```

### 4. `src/app/pages/home.tsx` (Async Server Component Page)

```tsx
// No 'use client' — server component, can await directly
import { fetchPosts } from '@/api'
import { Posts } from '@/components/home/posts'    // server component
import { State } from '@/components/home/state'    // 'use client'
import { CookieDemo } from '@/components/home/cookie-demo' // 'use client'

export default async function HomePage() {
  const posts = await fetchPosts()  // await directly — no Suspense/use() needed
  return (
    <>
      <Posts posts={posts} />  {/* static, server-rendered */}
      <State />                {/* interactive, client component reference */}
      <CookieDemo />           {/* interactive, client component reference */}
    </>
  )
}
```

---

## Existing Files to Modify

### `src/client/components/home/state/index.tsx`
Add `'use client'` directive at the top (already uses `useState` — must be client):
```diff
+ 'use client'
  import { useState } from 'react'
  export const State = () => { ... }
```

### `src/client/components/home/cookie-demo/index.tsx`
Add `'use client'` directive (uses `useCookies` hook):
```diff
+ 'use client'
  import { useCookies } from 'react-cookie'
  export const CookieDemo = () => { ... }
```

### `src/client/components/@shared/html/index.tsx`
Add `'use client'` directive (renders `<html>` shell on client for hydration):
```diff
+ 'use client'
  import type { FC } from 'react'
  export const Html: FC<AppProps> = ({ nonce, linkTags, children }) => { ... }
```

### `src/client/components/home/posts/index.tsx`
Convert to a pure server component (props-based, no `use()` hook needed since the
parent page component awaits the data and passes it directly):
```diff
- import { use } from 'react'
- export const Posts = ({ promise }: Props) => {
-   const posts = use(promise)
+ export const Posts = ({ posts }: Props) => {
    return ( ... )
  }
```

### `src/server/middleware/render/index.tsx`
Update to use RSC rendering pipeline:
```ts
import { renderToPipeableStream as rscRender } from 'react-server-dom-webpack/server.node'
import { createFromNodeStream } from 'react-server-dom-webpack/client.node'
import { renderToPipeableStream } from 'react-dom/server'

export const render = (req, res, next) => {
  res.renderApp = async () => {
    const clientManifest = getClientManifest()   // reads react-client-manifest.json
    const { Root } = getRSCBundle(res)           // loads rsc/bundle.js

    // Pass 1: RSC render (server components execute here)
    const { pipe: pipeRSC } = rscRender(
      <Root nonce={req.nonce} cookies={req.universalCookies} />,
      clientManifest
    )

    // Pass 2: HTML render (feeds RSC stream through react-dom/server)
    const rscStream = Readable.from(...)
    const reactTree = await createFromNodeStream(rscStream, clientManifest)
    const { pipe } = renderToPipeableStream(reactTree, {
      bootstrapScripts: clientAssets,
      onShellReady() { pipe(res) }
    })
  }
  next()
}
```

### `src/client/index.tsx`
Update client hydration to use RSC client:
```ts
import { createFromReadableStream } from 'react-server-dom-webpack/client'
import { hydrateRoot } from 'react-dom/client'

const rscPayload = document.getElementById('__RSC_DATA__').textContent
const stream = new ReadableStream({ start(c) { c.enqueue(rscPayload); c.close() } })
const root = createFromReadableStream(stream)

hydrateRoot(document, root)
```

### `rspack.config.ts`
Add the new `rsc.config` to the multi-compiler array:
```diff
  import client from './rspack/configs/client.config'
  import express from './rspack/configs/express.config'
  import server from './rspack/configs/server.config'
+ import rsc from './rspack/configs/rsc.config'

- export default [express, client, server]
+ export default [express, client, server, rsc]
```

---

## New Package Required

```
react-server-dom-webpack
```

This is React's official RSC bundler integration, identical to what Next.js uses internally.
It provides:
- `react-server-dom-webpack/server.node` — RSC renderer for Node.js (produces RSC payload)
- `react-server-dom-webpack/client` — RSC client (decodes payload into React tree)
- `createClientReference` — used by the loader to create client component stubs

---

## Implementation Sequence

1. **Install** `react-server-dom-webpack` package
2. **Create** `rspack/loaders/use-client.loader.ts`
3. **Create** `rspack/plugins/client-reference-manifest.plugin.ts`
4. **Create** `rspack/configs/rsc.config.ts`
5. **Update** `rspack.config.ts` to include rsc build
6. **Update** `rspack/configs/client.config.ts` to add manifest plugin + loader
7. **Add** `'use client'` to: `state/index.tsx`, `cookie-demo/index.tsx`, `html/index.tsx`
8. **Create** `src/app/root.tsx` and `src/app/pages/home.tsx` as async server components
9. **Update** `src/server/middleware/render/index.tsx` for RSC two-pass rendering
10. **Update** `src/client/index.tsx` for RSC-aware hydration
11. **Update** `render.util.ts` to load RSC bundle + client manifest

---

## Key Invariants to Preserve

- `renderToPipeableStream` streaming is kept — no blocking HTML generation
- HMR in dev mode continues to work (RSC bundle hot-reloads separately)
- Existing cookie sync, nonce, and chunk extraction patterns are unchanged
- TypeScript types enforced throughout (no `any` casts for RSC APIs)
- `IS_SERVER` / `IS_DEV` DefinePlugin globals remain consistent

---

## Trade-offs vs Full Next.js RSC

| Feature | This plan | Next.js |
|---|---|---|
| Async server components | Yes | Yes |
| Server components excluded from client bundle | Yes | Yes |
| `'use client'` boundary | Yes | Yes |
| Server Actions (`'use server'`) | No (future work) | Yes |
| Partial pre-rendering | No | Yes (Next 14+) |
| RSC hot reload in dev | Needs wiring | Yes |
| Nested layouts (server) | Yes (manual) | Yes (file-based) |
