import type { NextFunction, Request, Response } from 'express'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import { basename, logger, setEnvVars } from '@/common'

import { ChunkExtractor } from './chunk-extractor'
import { getApp, getStats } from './render.util'

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = () => {
		logger.debug('render middleware start')

		const chunkExtractor = new ChunkExtractor(getStats(res))
		const { App } = getApp(res)
		const { url, nonce } = req

		const { pipe } = renderToPipeableStream(
			<StaticRouter location={url} basename={basename}>
				<App
					nonce={nonce}
					cookies={req.universalCookies}
					linkTags={chunkExtractor.getLinkTags({ nonce })}
				/>
			</StaticRouter>,
			{
				nonce,
				bootstrapScriptContent: setEnvVars(),
				bootstrapScripts: chunkExtractor.assets
					.filter(a => a.url.endsWith('.js'))
					.map(a => a.url),
				onShellReady() {
					res.statusCode = 200
					res.setHeader('content-type', 'text/html')
					pipe(res)
				},
				onShellError() {
					res.statusCode = 500
					res.setHeader('content-type', 'text/html')
					res.send('<h1>Something went wrong</h1>')
				},
				onError(error) {
					logger.error(error)
				}
			}
		)
	}

	next()
}
