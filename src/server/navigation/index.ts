import 'server-only'

import {
	redirect as createRedirect,
	redirectDocument as createRedirectDocument,
	replace as createReplace
} from 'react-router'

import { basename, basePath } from '@/common/path'

type RedirectInit = number | ResponseInit

/**
 * 307/308 preserve the request method; 302/301 let browsers rewrite POST → GET.
 * Use 303 explicitly in form actions, where POST → GET is the desired outcome.
 */
const TEMPORARY = 307
const PERMANENT = 308

const withStatus = (init: RedirectInit | undefined, status: number): RedirectInit =>
	typeof init === 'number' ? init : { status, ...init }

/**
 * Redirect from a server component, loader or server function.
 *
 * Unlike react-router's `redirect`, this throws instead of returning — so it
 * ends the render like next.js' `redirect()` and types as `never`.
 *
 * Paths are app-relative (no basename), the same as `<Link to>`.
 */
export const redirect = (url: string, init?: RedirectInit): never => {
	throw createRedirect(url, withStatus(init, TEMPORARY))
}

/** {@link redirect} with a 308, for permanently moved resources. */
export const permanentRedirect = (url: string, init?: RedirectInit): never => {
	throw createRedirect(url, withStatus(init, PERMANENT))
}

/** {@link redirect} that replaces the current history entry client side. */
export const replace = (url: string, init?: RedirectInit): never => {
	throw createReplace(url, withStatus(init, TEMPORARY))
}

/** {@link redirect} that forces a full document navigation client side. */
export const redirectDocument = (url: string, init?: RedirectInit): never => {
	throw createRedirectDocument(url, withStatus(init, TEMPORARY))
}

const ABSOLUTE_URL = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i

/**
 * Prefixes a redirect `Location` with the basename.
 *
 * App code writes basename-less paths because that is what the client router
 * expects — it prepends the basename itself when it navigates on a redirect
 * payload. Document responses leave the server as real 3xx though, where the
 * browser needs the full path, so the prefix is applied once here, at the
 * boundary. Already-prefixed locations are left alone: react-router prepends
 * the basename itself when a redirect comes out of a form action.
 */
export const applyBasename = (response: Response): Response => {
	const location = response.headers.get('location')
	const isRedirect = response.status >= 300 && response.status < 400
	// `new URL('http://host/app/').pathname` keeps the trailing slash, and a
	// trailing-slash basename is legal — drop it so `/` collapses to '' (the
	// no-op case) and the prefix check below can't produce `//`.
	const base = basename.replace(/\/$/, '')

	if (!isRedirect || !location || !base) return response
	if (ABSOLUTE_URL.test(location)) return response
	if (location === base || location.startsWith(`${base}/`)) return response

	response.headers.set('location', basePath(location))

	return response
}
