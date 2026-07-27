'use client'

import { type FC, useEffect } from 'react'
import { Navigate } from 'react-router'

import { redirectError } from './redirect.util'

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

	// An absolute URL is outside the router's world, so `<Navigate>` can't serve
	// it — and calling `location.assign` during render would re-fire on every
	// re-render before the browser has torn the page down.
	useEffect(() => {
		if (href) window.location[replace ? 'replace' : 'assign'](href)
	}, [href, replace])

	return to ? <Navigate to={to} replace={replace} /> : null
}
