import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import type { ReadableStream as NodeReadableStream } from 'node:stream/web'
import type { NextFunction, Request, Response } from 'express'

import { logger, setEnvVars } from '@/common'

import { ChunkExtractor } from './chunk-extractor'
import { getRender, getStats } from './render.util'

const toWebRequest = (req: Request, res: Response): globalThis.Request => {
	const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`

	const headers = new Headers()
	for (const [key, value] of Object.entries(req.headers)) {
		if (Array.isArray(value)) for (const item of value) headers.append(key, item)
		else if (value !== undefined) headers.set(key, value)
	}

	const body = ['GET', 'HEAD'].includes(req.method)
		? undefined
		: (Readable.toWeb(req) as ReadableStream<Uint8Array>)

	// A premature socket close (client gone before the response finished) aborts
	// the render: Fizz and Flight both take this signal, so aborting ends their
	// streams — which is also what unblocks the finalize loop on a leaked
	// renderLock (docs/rsc.md §8.7).
	const controller = new AbortController()
	res.on('close', () => {
		if (!res.writableFinished) controller.abort()
	})

	return new globalThis.Request(url, {
		body,
		headers,
		method: req.method,
		signal: controller.signal,
		// `duplex` is required by undici for streaming bodies, but missing from the RequestInit type
		...(body && ({ duplex: 'half' } as object))
	})
}

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = async () => {
		logger.debug('render middleware start')

		const chunkExtractor = new ChunkExtractor(getStats(res))
		const { handler } = getRender(res)
		const { nonce } = req
		const request = toWebRequest(req, res)

		try {
			const response = await handler(request, {
				nonce,
				linkTags: chunkExtractor.getLinkTags({ nonce }),
				bootstrapScriptContent: setEnvVars(),
				bootstrapScripts: chunkExtractor.assets
					.filter(a => a.url.endsWith('.js'))
					.map(a => a.url)
			})

			res.status(response.status)
			response.headers.forEach((value, key) => {
				// set-cookie is multi-valued — copied separately below, one line per cookie
				if (key !== 'set-cookie') res.setHeader(key, value)
			})
			const cookies = response.headers.getSetCookie()
			if (cookies.length) res.setHeader('set-cookie', cookies)

			if (response.body)
				await pipeline(
					Readable.fromWeb(response.body as NodeReadableStream<Uint8Array>),
					res
				)
			else res.end()
		} catch (error) {
			// An aborted render (client disconnect) can reject anywhere — the
			// handler, the finalize loop, or mid-pipe. There is nobody to reply to.
			if (request.signal.aborted) logger.debug('render aborted: client disconnected')
			else throw error
		}
	}

	next()
}
