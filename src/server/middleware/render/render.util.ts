import { join, resolve } from 'path'
import type { Response } from 'express'
import type { ChunkExtractor, ChunkExtractorOptions } from '@loadable/server'
import requireFromString from 'require-from-string'

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

export const getStats = (res: Response): ChunkExtractorOptions => {
	if (!IS_DEV) return { statsFile: resolve('./dist/loadable-stats.json') }

	const multiStats = res.locals.webpack.devMiddleware.stats?.toJson()
	const stats = multiStats?.children?.find(child => child.name === 'client')
	if (!stats) throw Error('Webpack config is unsuitable for SSR')

	return { stats }
}

export const getApp = (res: Response) => {
	if (!IS_DEV) return require('./app.server.js')

	const stats = res.locals.webpack.devMiddleware.stats?.toJson()
	const statsCompilation = stats?.children?.find(child => child.name === 'server')
	if (!statsCompilation) throw Error('Webpack config is unsuitable for SSR')

	const { assetsByChunkName, outputPath } = statsCompilation
	const outputFileSystem = res.locals.webpack.devMiddleware.outputFileSystem
	const serverAppFileName = assetsByChunkName?.main?.find(asset => asset === 'app.server.js')

	if (!(serverAppFileName && outputPath && outputFileSystem.readFileSync)) {
		throw Error('Render file not found')
	}

	return requireFromString(
		outputFileSystem.readFileSync(join(outputPath, serverAppFileName), 'utf-8'),
		serverAppFileName
	)
}
