import 'server-only'

import { AsyncLocalStorage } from 'node:async_hooks'
import { type SerializeOptions, serialize } from 'cookie'
import type { LinkHTMLAttributes } from 'react'
import {
	redirect as createRedirect,
	redirectDocument as createRedirectDocument,
	replace as createReplace
} from 'react-router'
import invariant from 'tiny-invariant'
import Cookies from 'universal-cookie'

export interface ResponseState {
	status?: number
	statusText?: string
	headers: Headers
}

export interface ResponseCookies {
	/** Appends a `Set-Cookie` line. Defaults to `path: '/'`. */
	set: (name: string, value: string, options?: SerializeOptions) => void
	/** Expires a cookie — pass the same `path`/`domain` it was set with, or browsers keep it. */
	delete: (name: string, options?: Omit<SerializeOptions, 'expires' | 'maxAge'>) => void
}

export interface RenderLock {
	/** Bare form — you own the release. */
	(): () => void
	/** Callback form — releases when the callback settles, even on throw. */
	<T>(fn: () => T | Promise<T>): Promise<T>
}

export interface RedirectInit {
	/**
	 * Defaults to 307. 307/308 preserve the request method; 302/301 let browsers
	 * rewrite POST → GET. Use 303 explicitly in form actions, where POST → GET is
	 * the desired outcome.
	 */
	status?: number
	/** Replace the current history entry instead of pushing one. Client navigations only. */
	replace?: boolean
	/** Force a full document navigation rather than a client-side one. */
	document?: boolean
}

export interface ResponseApi {
	/** Merged over the render's own headers at finalize: `set` replaces, `append` adds, `delete` removes. */
	headers: Headers
	cookies: ResponseCookies
	/** Overrides the status react-router computed for the match. */
	status: (code: number, statusText?: string) => void
	renderLock: RenderLock
	/**
	 * Ends the render with a redirect — it throws, so it types as `never` and
	 * TypeScript narrows past the call. Paths are app-relative (no basename), the
	 * same as `<Link to>`.
	 *
	 * Unlike the mutations above, this is *not* subject to the finalize merge, so
	 * `renderLock` does nothing for it — see the timing note on `response()`.
	 */
	redirect: (url: string, init?: RedirectInit) => never
}

export interface RenderLockState {
	count: number
	gate: Promise<void> | null
	release: () => void
}

export interface RequestStore {
	url: URL
	nonce: string
	headers: Headers
	cookies: Cookies
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
	response: ResponseState
	lock: RenderLockState
}

export const storage = new AsyncLocalStorage<RequestStore>()

export const createRequestStore = (
	request: Request,
	options: Pick<RequestStore, 'nonce' | 'linkTags'>
): RequestStore => ({
	url: new URL(request.url),
	nonce: options.nonce,
	headers: request.headers,
	cookies: new Cookies(request.headers.get('cookie')),
	linkTags: options.linkTags,
	response: { headers: new Headers() },
	lock: { count: 0, gate: null, release: () => {} }
})

const store = (caller: string) => {
	const value = storage.getStore()
	invariant(value, `${caller} is only available during an RSC render`)

	return value
}

export const request = () => store('request()')

/**
 * The write half of `request()` — mutations are merged into the HTTP response
 * when it is finalized (see docs/rsc.md §8). They only take effect if they run
 * before the response flushes: before the component's first `await`, or inside a
 * `renderLock` window.
 *
 * `redirect` is the exception: it throws instead of being merged, so it obeys a
 * different deadline (the Fizz shell flush, docs/rsc.md §12) that `renderLock`
 * cannot extend. Redirect early rather than reaching for a lock.
 */
export const response = (): ResponseApi => {
	const state = store('response()').response

	const set = (name: string, value: string, options?: SerializeOptions) => {
		state.headers.append('set-cookie', serialize(name, value, { path: '/', ...options }))
	}

	return {
		headers: state.headers,
		cookies: {
			set,
			delete: (name, options) => set(name, '', { ...options, expires: new Date(0) })
		},
		status: (code, statusText) => {
			state.status = code
			state.statusText = statusText
		},
		renderLock,
		redirect
	}
}

/**
 * Exposed as `response().redirect`. The three react-router constructors differ
 * only in a marker header, so they are options here rather than separate
 * functions. Headers belong on `response().headers` / `response().cookies`, not
 * on the redirect: a redirect thrown from a server component reaches the client
 * as a digest carrying only location/status/replace/document, so anything hung
 * off the `Response` itself is dropped.
 */
const redirect = (url: string, { status = 307, replace, document }: RedirectInit = {}) => {
	// `document` outranking `replace` mirrors the router: its document-reload
	// branch returns before `X-Remix-Replace` is ever read, so the two markers
	// never compose upstream either.
	const create = document ? createRedirectDocument : replace ? createReplace : createRedirect

	throw create(url, status)
}

function renderLock(): () => void
function renderLock<T>(fn: () => T | Promise<T>): Promise<T>

/**
 * Exposed as `response().renderLock`. Holds the response's status/headers flush
 * open across `await`s so the mutations above still make it out — take it BEFORE
 * the component's first `await`. Locks nest; the response flushes when the last
 * one releases.
 */
function renderLock<T>(fn?: () => T | Promise<T>) {
	const { lock } = store('renderLock()')

	lock.count++
	lock.gate ??= new Promise<void>(resolve => {
		lock.release = resolve
	})

	let released = false
	const unlock = () => {
		if (released) return
		released = true

		// Deferred so a lock chained in the continuation of `await renderLock(fn)`
		// (a microtask, which runs first) keeps the gate closed with no gap.
		setImmediate(() => {
			if (--lock.count === 0) {
				lock.release()
				lock.gate = null
			}
		})
	}

	if (!fn) return unlock

	return (async () => {
		try {
			return await fn()
		} finally {
			unlock()
		}
	})()
}
