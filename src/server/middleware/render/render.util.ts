import { join, resolve } from 'path'
import type { FC, ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { ServerResponse } from 'webpack-dev-middleware'
import type { ChunkExtractor, ChunkExtractorOptions } from '@loadable/server'
import requireFromString from 'require-from-string'
import { getENV, setEnvVars, basePath, publicPath } from 'src/common'

export const getHtml = (reactHtml: string, chunkExtractor: ChunkExtractor) => {
	const appVersion = getENV('APP_VERSION')
	const scriptTags = chunkExtractor.getScriptTags()
	const linkTags = chunkExtractor.getLinkTags()
	const styleTags = chunkExtractor.getStyleTags()

	return `
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>SSR app</title>
        <meta name='data-app-version' content='${appVersion}'>
        <link rel='icon' type='image/x-icon' href='${publicPath('icons/favicon.ico')}'>
        <link rel='apple-touch-icon' href='${publicPath('icons/maskable.png')}'>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='theme-color' content='#efefef'>
        ${getManifest()}
        ${linkTags}
        ${styleTags}
        ${setEnvVars()}
    </head>
    <body>
        <div id='root'>${reactHtml}</div>
        ${scriptTags}
    </body>
</html>`
}

export const getStats = (res: ServerResponse): ChunkExtractorOptions => {
	if (IS_PROD)
		return {
			statsFile: resolve(__dirname, '../client/loadable-stats.json'),
			publicPath: publicPath('/')
		}

	const multiStats = res.locals?.webpack?.devMiddleware?.stats?.toJson()
	const stats = multiStats?.children?.find(child => child.name === 'client')
	if (!stats) throw Error('Webpack config is unsuitable for SSR')

	return { stats, publicPath: publicPath('/') }
}

export const getManifest = (nonce?: string) => {
	if (IS_DEV) return ''
	return `<link nonce='${nonce}' rel='manifest' href='${basePath('manifest.json')}' />`
}

export const getApp = (
	res: ServerResponse
): { App: FC<{ children: ReactNode }>; routes: RouteObject[] } => {
	if (IS_PROD) return require('../client/js/app.server.js')

	const stats = res.locals?.webpack?.devMiddleware?.stats?.toJson()
	const statsCompilation = stats?.children?.find(child => child.name === 'server')
	if (!statsCompilation) throw Error('Webpack config is unsuitable for SSR')

	const { assetsByChunkName, outputPath } = statsCompilation
	const outputFileSystem = res.locals?.webpack?.devMiddleware?.outputFileSystem
	const serverAppFileName = assetsByChunkName?.main?.find(asset => asset === 'js/app.server.js')

	if (!(serverAppFileName && outputPath && outputFileSystem?.readFileSync)) {
		throw Error('Render file not found')
	}

	return requireFromString(
		outputFileSystem.readFileSync(join(outputPath, serverAppFileName), 'utf-8')
	)
}
