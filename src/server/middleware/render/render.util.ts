import { join, resolve } from 'node:path'
import type { StatsCompilation } from '@rspack/core'
import type { ServerResponse } from '@rspack/dev-middleware'
import requireFromString from 'require-from-string'

import { publicPath } from '@/common'

import type { ChunkExtractorOptions } from './chunk-extractor'
import type { handler } from './rsc'

const statsOptions = {
	all: false,
	ids: true,
	hash: true,
	assets: true,
	outputPath: true,
	publicPath: true,
	chunkGroups: true,
	chunkGroupChildren: true
}

export const getStats = (res: ServerResponse): ChunkExtractorOptions => {
	if (IS_PROD) {
		return {
			statsFile: resolve(__dirname, '../client/stats.json'),
			publicPath: publicPath('/')
		}
	}

	const multiStats = res.locals?.webpack?.devMiddleware?.stats?.toJson(statsOptions)
	const stats = multiStats?.children?.find(child => child.name === 'client') as StatsCompilation

	if (!stats) throw Error('Webpack config is unsuitable for SSR')

	return { stats, publicPath: publicPath('/') }
}

export const getRender = (res: ServerResponse): { handler: typeof handler } => {
	if (IS_PROD) return require('../client/js/app.server.js')

	const stats = res.locals?.webpack?.devMiddleware?.stats?.toJson(statsOptions)
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
