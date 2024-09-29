import type { FC } from 'react'
import { join, resolve } from 'path'
import type { RouteObject } from 'react-router-dom'
import requireFromString from 'require-from-string'
import type { ServerResponse } from 'webpack-dev-middleware'
import type { ChunkExtractorOptions } from '@loadable/server'
import { getENV, setEnvVars, basePath, publicPath, type AppProps } from 'src/common'
import type { Options } from './render.types'

export const getHtml = ({
	nonce,
	reactHtml,
	chunkExtractor,
	helmet: { title, meta, link }
}: Options) => {
	const appVersion = getENV('APP_VERSION')
	const scriptTags = chunkExtractor.getScriptTags({ nonce })
	const linkTags = chunkExtractor.getLinkTags({ nonce })
	const styleTags = chunkExtractor.getStyleTags({ nonce })

	return `
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='data-app-version' content='${appVersion}'>
        <link rel='icon' type='image/x-icon' href='${publicPath('icons/favicon.ico')}'>
        <link rel='apple-touch-icon' href='${publicPath('icons/maskable.png')}'>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='theme-color' content='#efefef'>
        ${getManifest(nonce)}
        ${meta.toString()}
        ${title.toString()}
        ${setEnvVars(nonce)}
        ${link.toString()}
        ${linkTags}
        ${styleTags}
    </head>
    <body>
        <div id='root'>${reactHtml}</div>
        <script nonce='${nonce}'>
        	window.nonce=${JSON.stringify(nonce)};
        </script>
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

export const getApp = (res: ServerResponse): { App: FC<AppProps>; routes: RouteObject[] } => {
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
