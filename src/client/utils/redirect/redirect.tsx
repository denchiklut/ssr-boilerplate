'use client'

import { type FC, use } from 'react'
import { useNavigate } from 'react-router'

import { redirectError } from './redirect.util'

/**
 * Never settles. react-router applies its navigation state inside
 * `startTransition`, so suspending here makes React keep the *previous* page
 * painted instead of committing this one — the redirect leaves without ever
 * showing a blank frame. Released by the browser leaving the page, nothing else.
 */
const NEVER = new Promise<never>(() => {})

/**
 * Fires `fn` once per target. Render is not normally a safe place for a side
 * effect, but suspending means this component never commits and never runs an
 * effect, so render is the only phase left — and the page is on its way out, so
 * there is no state left to keep consistent.
 *
 * The key is released on the next macrotask rather than kept forever: it only
 * needs to swallow StrictMode's synchronous double render, and a permanent guard
 * would silently no-op a legitimate second redirect to the same target later in
 * the session, leaving the component suspended with nothing to release it.
 */
const fired = new Set<string>()
const once = (key: string, fn: () => void) => {
	if (fired.has(key)) return

	fired.add(key)
	setTimeout(() => fired.delete(key), 0)
	fn()
}

interface BaseProps {
	/**
	 * Status of the initial-document 3xx. Ignored on client navigations, which
	 * have no HTTP response of their own. Defaults to 307, matching
	 * `response().redirect` (docs/rsc.md §12).
	 */
	status?: number
	/** Replace the current history entry instead of pushing one. */
	replace?: boolean
}

/**
 * `to` is app-relative and stays inside the router — write it without the
 * basename, exactly like `<Link to>`. `href` is an absolute URL that leaves the
 * app entirely.
 */
export type RedirectProps = BaseProps &
	({ to: string; href?: never } | { to?: never; href: string })

/**
 * Redirects from a client component. The server-side counterpart is
 * `response().redirect` from `@/rsc`, which client components cannot import.
 *
 * Subject to the same deadline as every other render-time redirect: decide it
 * before the shell flushes, or it degrades to `<meta http-equiv="refresh">`
 * (docs/rsc.md §12).
 */
export const Redirect: FC<RedirectProps> = ({ to, href, status = 307, replace = false }) => {
	// Client components render on the server too, during the SSR pass — so the
	// initial document can answer with a real 3xx instead of shipping HTML the
	// browser would immediately discard. It has to *throw*: react-router's
	// `onError` is the only hook that turns a render-time redirect into a
	// response.
	if (IS_SERVER) {
		throw redirectError({
			status,
			replace,
			// the prop union guarantees exactly one of the two is set, but the
			// correlation doesn't survive destructuring
			location: (href ?? to) as string,
			reloadDocument: Boolean(href)
		})
	}

	// Below the throw on purpose: `IS_SERVER` is a build constant, so the server
	// bundle never reaches a hook and the client bundle drops the branch entirely.
	const navigate = useNavigate()

	// An absolute URL is outside the router's world: every programmatic path
	// (`<Navigate>`, `useNavigate`, the router's own `normalizeTo`) runs `resolveTo`,
	// which treats a string with no leading `/` as *relative* — `https://example.com/`
	// resolves to `/<current>/https:/example.com/` and lands on the catch-all 404.
	// Only `<Link>` knows about external URLs, and that needs a click.
	//
	// Both branches defer a microtask: `navigate` because the router's state update
	// must land outside this render, `location` so a full-document unload never
	// starts in the middle of a render pass React might still be working through.
	if (href) {
		once(`href:${href}`, () =>
			queueMicrotask(() => window.location[replace ? 'replace' : 'assign'](href))
		)
	} else {
		once(`to:${to}`, () => queueMicrotask(() => navigate(to as string, { replace })))
	}

	// Hold the outgoing page on screen until one of the above takes it away.
	return use(NEVER)
}
