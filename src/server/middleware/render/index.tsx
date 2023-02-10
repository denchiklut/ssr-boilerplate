import { NextFunction, Request, Response } from 'express'
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import { createStaticRouter, StaticRouterProvider } from 'react-router-dom/server'
import { createStaticHandler } from '@remix-run/router'
import { createFetchRequest } from 'server/utils'
import { getApp, getHtml, getStats } from './render.util'

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = async () => {
		const chunkExtractor = new ChunkExtractor(getStats(res))
		const { App, routes } = getApp(res)
		const { query } = createStaticHandler(routes)
		const webRequest = createFetchRequest(req)
		const context = await query(webRequest)

		if (context instanceof globalThis.Response) {
			return res.status(context.status).redirect(context.url)
		}

		const jsx = chunkExtractor.collectChunks(
			<App>
				<StaticRouterProvider
					router={createStaticRouter(routes, context)}
					context={context}
				/>
			</App>
		)

		const reactHtml = renderToString(jsx)

		res.status(200).send(getHtml(reactHtml, chunkExtractor))
	}

	next()
}
