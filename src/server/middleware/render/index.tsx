import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import type { HelmetServerState } from 'react-helmet-async'
import type { NextFunction, Request, Response } from 'express'
import {
	createStaticRouter,
	StaticRouterProvider,
	createStaticHandler
} from 'react-router-dom/server'
import { getApp, getHtml, getStats } from './render.util'
import { createFetchRequest } from 'server/utils'
import { basename, logger } from 'src/common'

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = async () => {
		const start = performance.now()
		logger.debug('render middleware start')

		const { nonce } = req
		const chunkExtractor = new ChunkExtractor(getStats(res))
		const { App, routes } = getApp(res)
		const { query } = createStaticHandler(routes)
		const webRequest = createFetchRequest(req)
		const context = await query(webRequest)
		const helmetContext = { helmet: {} as HelmetServerState }

		if (context instanceof globalThis.Response) {
			return res.status(context.status).redirect(context.url)
		}

		context.basename = basename

		const jsx = chunkExtractor.collectChunks(
			<App nonce={nonce} helmetContext={helmetContext}>
				<StaticRouterProvider
					router={createStaticRouter(routes, context)}
					context={context}
				/>
			</App>
		)

		const reactHtml = renderToString(jsx)
		const { helmet } = helmetContext

		logger.debug('render middleware in %d ms', Math.round(performance.now() - start))

		res.status(200).send(
			getHtml({
				nonce,
				reactHtml,
				chunkExtractor,
				helmet
			})
		)
	}

	next()
}
