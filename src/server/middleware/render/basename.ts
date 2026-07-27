import { basename, basePath } from '@/common/path'

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
