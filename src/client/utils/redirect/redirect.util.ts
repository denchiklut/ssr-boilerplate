export interface RedirectDigestInit {
	status: number
	statusText?: string
	location: string
	/** Force a full document load instead of a client-side navigation. */
	reloadDocument?: boolean
	replace?: boolean
}

// `decodeRedirectErrorDigest` slices the payload off at a hardcoded offset, so
// the prefix has to match byte for byte.
const DIGEST_PREFIX = 'REACT_ROUTER_ERROR:REDIRECT:'

/**
 * Mirrors react-router's `createRedirectErrorDigest` (v8.2.0,
 * `dist/development/index-react-server.js`), which lives behind the
 * `react-server` condition and is not exported.
 *
 * `routeRSCServerRequest`'s `onError` recognises a render-time redirect *only*
 * by this digest string — a thrown `Response` is ignored and 500s. Server
 * components get the digest for free, because the Flight renderer mints it when
 * it encodes the error; a client component throws during the SSR pass, after
 * that point, so it has to mint its own to reach the same recovery path
 * (docs/rsc.md §12).
 *
 * `decodeRedirectErrorDigest` type-checks every field before accepting it, which
 * is why the booleans are defaulted rather than left `undefined`: one wrong type
 * and the digest is silently discarded, turning the redirect into a 500.
 */
export const redirectError = ({
	status,
	statusText = '',
	location,
	reloadDocument = false,
	replace = false
}: RedirectDigestInit) =>
	Object.assign(new Error(`Redirect to ${location}`), {
		digest: `${DIGEST_PREFIX}${JSON.stringify({
			status,
			statusText,
			location,
			reloadDocument,
			replace
		})}`
	})
