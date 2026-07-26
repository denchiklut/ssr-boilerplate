import 'server-only'

import { AsyncLocalStorage } from 'node:async_hooks'
import { type SerializeOptions, serialize } from 'cookie'
import type { LinkHTMLAttributes } from 'react'
import invariant from 'tiny-invariant'
import Cookies from 'universal-cookie'

export interface ResponseState {
	status?: number
	statusText?: string
	headers: Headers
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
 * Response mutations below are merged into the HTTP response when it is
 * finalized — see docs/response.md. They only take effect if they run before
 * the response flushes: before the component's first `await`, or inside a
 * `renderLock` window.
 */
export const setHeader = (name: string, value: string) => {
	store('setHeader()').response.headers.set(name, value)
}

export const appendHeader = (name: string, value: string) => {
	store('appendHeader()').response.headers.append(name, value)
}

export const deleteHeader = (name: string) => {
	store('deleteHeader()').response.headers.delete(name)
}

/** Overrides the status react-router computed for the match. */
export const status = (code: number, statusText?: string) => {
	const { response } = store('status()')

	response.status = code
	response.statusText = statusText
}

export const setCookie = (name: string, value: string, options?: SerializeOptions) => {
	store('setCookie()').response.headers.append(
		'set-cookie',
		serialize(name, value, { path: '/', ...options })
	)
}

/** Pass the same `path`/`domain` the cookie was set with, or browsers keep it. */
export const deleteCookie = (
	name: string,
	options?: Omit<SerializeOptions, 'expires' | 'maxAge'>
) => {
	setCookie(name, '', { ...options, expires: new Date(0) })
}

export function renderLock(): () => void
export function renderLock<T>(fn: () => T | Promise<T>): Promise<T>

/**
 * Holds the response's status/headers flush open across `await`s so the
 * mutations above still make it out — take it BEFORE the component's first
 * `await`. Locks nest; the response flushes when the last one releases.
 */
export function renderLock<T>(fn?: () => T | Promise<T>) {
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
