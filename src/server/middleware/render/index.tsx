import { StaticRouter } from 'react-router'
import { renderToPipeableStream } from 'react-dom/server'
import type { NextFunction, Request, Response } from 'express'
import { logger, basename, setEnvVars } from "../../../common";
import { ChunkExtractor } from "../../utils";
import { getApp, getStats } from "./render.util";

export const render = (req: Request, res: Response, next: NextFunction) => {
	res.renderApp = () => {
		logger.debug('render middleware start')

		const chunkExtractor = new ChunkExtractor(getStats())
		const { App } = getApp()
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
