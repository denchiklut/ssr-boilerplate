import { join, resolve } from 'path'
import type { FC } from 'react'
import type { ServerResponse } from 'webpack-dev-middleware'
import type { ChunkExtractorOptions } from '@loadable/server'
import requireFromString from 'require-from-string'
import { basePath, publicPath, AppProps } from 'src/common'

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

export const getApp = (res: ServerResponse): { App: FC<AppProps> } => {
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
