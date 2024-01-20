import { ChunkExtractor } from '@loadable/server'
import { StaticRouter } from 'react-router-dom/server'
import { renderToPipeableStream } from 'react-dom/server'
import type { NextFunction, Request, Response } from 'express'
import { createEmotionCache, logger, setEnvVars } from 'src/common'
import { getApp, getStats } from './render.util'
import { PassThrough } from 'stream'
import createEmotionServer from '@emotion/server/create-instance'

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = () => {
		logger.debug('render middleware start')

		const chunkExtractor = new ChunkExtractor(getStats(res))
		const { App } = getApp(res)
		const { url, nonce } = req
		const cache = createEmotionCache(nonce)

		const { pipe } = renderToPipeableStream(
			<StaticRouter location={url}>
				<App nonce={nonce} chunkExtractor={chunkExtractor} emotionCache={cache} />
			</StaticRouter>,
			{
				nonce,
				bootstrapScriptContent: setEnvVars(),
				onShellReady() {
					const reactBody = new PassThrough()
					const emotionServer = createEmotionServer(cache)
					const bodyWithStyles = emotionServer.renderStylesToNodeStream()

					reactBody.pipe(bodyWithStyles).pipe(res)
					res.set('Content-Type', 'text/html')
					res.statusCode = 200

					pipe(reactBody)
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
