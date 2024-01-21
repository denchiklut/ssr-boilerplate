import { StatsCompilation } from 'webpack'

export interface ChunkExtractorOptions {
	stats?: StatsCompilation
	statsFile?: string
	publicPath?: string
	outputPath?: string
	entrypoints?: string | string[]
}

export interface ChunkAsset {
	filename: string
	integrity: string
	scriptType: string | null
	url: string
	path: string
	linkType: string
	chunk: any
	type: string
}
