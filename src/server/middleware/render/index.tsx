import { dehydrate } from '@tanstack/react-query'
import type { NextFunction, Request, Response } from 'express'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { basename, getQueryClient, logger, setEnvVars } from '@/common'

import { ChunkExtractor } from './chunk-extractor'
import { getApp, getStats } from './render.util'

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = () => {
		logger.debug('render middleware start')

		const chunkExtractor = new ChunkExtractor(getStats(res))
		const { App } = getApp(res)
		const { url, nonce } = req
		const client = getQueryClient(req)

		const { pipe } = renderToPipeableStream(
			<StaticRouter location={url} basename={basename}>
				<App
					nonce={nonce}
					cookies={req.universalCookies}
					linkTags={chunkExtractor.getLinkTags({ nonce })}
					client={client}
				/>
			</StaticRouter>,
			{
				nonce,
				bootstrapScriptContent: setEnvVars(),
				bootstrapScripts: chunkExtractor.assets
					.filter(a => a.url.endsWith('.js'))
					.map(a => a.url),
				onAllReady() {
					res.statusCode = 200
					res.setHeader('content-type', 'text/html')
					res.write(`<script nonce="${nonce}">window.__REACT_QUERY_STATE__=${JSON.stringify(dehydrate(client))}</script>`)

					pipe(res)
				},
				onError(error) {
					logger.error(error)
				}
			}
		)
	}

	next()
}
