import type { Request } from 'express'

export const createFetchHeaders = (requestHeaders?: Request['headers']): Headers => {
	const headers = new Headers()

	for (const [key, values] of Object.entries(requestHeaders ?? {})) {
		if (values) {
			if (Array.isArray(values)) {
				for (const value of values) {
					headers.append(key, value)
				}
			} else {
				headers.set(key, values)
			}
		}
	}

	return headers
}

export const createFetchRequest = (req: Request): globalThis.Request => {
	const origin = `${req.protocol}://${req.get('host')}`
	const url = new URL(req.originalUrl || req.url, origin)

	const controller = new AbortController()

	req.on('close', () => {
		controller.abort()
	})

	const init: RequestInit = {
		method: req.method,
		headers: createFetchHeaders(req.headers),
		signal: controller.signal
	}

	if (req.method !== 'GET' && req.method !== 'HEAD') {
		init.body = req.body
	}

	return new Request(url.href, init)
}
