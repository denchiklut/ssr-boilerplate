import { NextFunction, Request, Response } from 'express'
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { getApp, getHtml, getStats } from './render.util'

export const render = (req: Request, res: Response, next: NextFunction) => {
	const chunkExtractor = new ChunkExtractor(getStats(res))
	const { App } = getApp(res)

	res.renderApp = async () => {
		const location = req.url
		const jsx = chunkExtractor.collectChunks(
			<StaticRouter location={location}>
				<App />
			</StaticRouter>
		)
		const reactHtml = renderToString(jsx)

		res.status(200).send(getHtml(reactHtml, chunkExtractor))
	}

	next()
}
