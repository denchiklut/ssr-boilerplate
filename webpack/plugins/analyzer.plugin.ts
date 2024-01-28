import type { WebpackPluginInstance } from 'webpack'
import { StatsWriterPlugin } from 'webpack-stats-plugin'

import { IS_PROD } from '../utils'

export const analyzePlugin =
	IS_PROD &&
	(new StatsWriterPlugin({
		filename: 'analyze.json',
		stats: { assets: true, chunks: true, modules: true }
	}) as unknown as WebpackPluginInstance)
