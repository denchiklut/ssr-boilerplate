import { renderToPipeableStream } from 'react-dom/server'
import type { NextFunction, Request, Response } from 'express'
import { StaticRouter } from 'react-router-dom/server'
import { logger, setEnvVars, basename } from 'src/common'
import { ChunkExtractor } from 'server/utils'
import { getApp, getStats } from './render.util'

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = () => {
		logger.debug('render middleware start')

		const chunkExtractor = new ChunkExtractor(getStats(res))
		const { App } = getApp(res)
		const { url, nonce } = req

		const { pipe } = renderToPipeableStream(
			<StaticRouter location={url} basename={basename}>
				<App nonce={nonce} cookies={req.universalCookies} />
			</StaticRouter>,
			{
				nonce,
				bootstrapScriptContent: setEnvVars(),
				bootstrapScripts: chunkExtractor.getMainAssets().map(asset => asset.url),
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
