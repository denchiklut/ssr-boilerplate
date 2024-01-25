import type { FC } from 'react'
import { join, resolve } from 'path'
import requireFromString from 'require-from-string'
import type { ServerResponse } from 'webpack-dev-middleware'
import type { ChunkExtractorOptions } from 'server/utils'
import { publicPath, type AppProps } from 'src/common'
import invariant from 'tiny-invariant'

export const getStats = (res: ServerResponse): ChunkExtractorOptions => {
	if (IS_PROD)
		return {
			statsFile: resolve(__dirname, '../client/assets-stats.json'),
			publicPath: publicPath('/')
		}

	const multiStats = res.locals?.webpack?.devMiddleware?.stats?.toJson()
	const stats = multiStats?.children?.find(child => child.name === 'client')
	invariant(stats, 'Webpack config is unsuitable for SSR')

	return { stats, publicPath: publicPath('/') }
}

export const getApp = (res: ServerResponse): { App: FC<AppProps> } => {
	if (IS_PROD) return require('../client/js/app.server.js')

	const stats = res.locals?.webpack?.devMiddleware?.stats?.toJson()
	const statsCompilation = stats?.children?.find(child => child.name === 'server')
	invariant(statsCompilation, 'Webpack config is unsuitable for SSR')

	const { assetsByChunkName, outputPath } = statsCompilation
	const outputFileSystem = res.locals?.webpack?.devMiddleware?.outputFileSystem
	const serverAppFileName = assetsByChunkName?.main?.find(asset => asset === 'js/app.server.js')

	invariant(
		serverAppFileName && outputPath && outputFileSystem?.readFileSync,
		'Render file not found'
	)

	return requireFromString(
		outputFileSystem.readFileSync(join(outputPath, serverAppFileName), 'utf-8')
	)
}
