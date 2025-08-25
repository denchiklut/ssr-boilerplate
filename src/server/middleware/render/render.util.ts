import { resolve } from 'path'
import type { FC } from 'react'
import type { ChunkExtractorOptions } from '../../utils'
import { publicPath, AppProps } from '../../../common'

export const getStats = (): ChunkExtractorOptions => {
	return {
		statsFile: resolve(__dirname, '../client/stats.json'),
		publicPath: publicPath('/')
	}
}

export const getApp = (): { App: FC<AppProps> } => {
	 return require('../client/js/app.server.js')
}
