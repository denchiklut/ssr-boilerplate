import 'server-only'

import { AsyncLocalStorage } from 'node:async_hooks'
import type { LinkHTMLAttributes } from 'react'
import invariant from 'tiny-invariant'
import type Cookies from 'universal-cookie'

export const storage = new AsyncLocalStorage<{
	url: URL
	nonce: string
	headers: Headers
	cookies: Cookies
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
}>()

export const request = () => {
	const value = storage.getStore()
	invariant(value, 'reqest() is only available during an RSC render')

	return Promise.resolve(value)
}
