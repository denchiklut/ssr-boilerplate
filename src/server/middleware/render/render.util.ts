import { join, resolve } from 'path'
import type { Response } from 'express'
import { ChunkExtractor } from '@loadable/server'
import requireFromString from 'require-from-string'
import type { Stats } from './render.types'

export const getHtml = (reactHtml: string, chunkExtractor: ChunkExtractor) => {
	const scriptTags = chunkExtractor.getScriptTags()
	const linkTags = chunkExtractor.getLinkTags()
	const styleTags = chunkExtractor.getStyleTags()

	return `
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>SSR app</title>
        ${linkTags}
        ${styleTags}
    </head>
    <body>
        <div id='root'>${reactHtml}</div>
        ${scriptTags}
    </body>
</html>`
}

export const getStats = (res: Response) => {
	if (!IS_DEV) return { statsFile: resolve('./dist/loadable-stats.json') }

	const stats: Stats = res.locals.webpack.devMiddleware.stats.toJson()
	return { stats: stats.children.find(child => child.name === 'client') }
}

export const getApp = (res: Response) => {
	if (!IS_DEV) return require('./app.server.js')

	const stats: Stats = res.locals.webpack.devMiddleware.stats.toJson()
	const { assetsByChunkName, outputPath } = stats.children.find(child => child.name === 'server')
	const outputFileSystem = res.locals.webpack.devMiddleware.outputFileSystem
	const serverAppFileName = assetsByChunkName.main.find(asset => asset === 'app.server.js')

	return requireFromString(
		outputFileSystem.readFileSync(join(outputPath, serverAppFileName), 'utf-8'),
		serverAppFileName
	)
}
