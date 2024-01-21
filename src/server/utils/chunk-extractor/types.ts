import type { StatsCompilation } from 'webpack'

export interface ChunkExtractorOptions {
	stats?: StatsCompilation
	statsFile?: string
	publicPath?: string
	outputPath?: string
	entrypoints?: string | string[]
}

export interface ChunkAsset {
	filename: string
	scriptType: Nullable<string>
	url: string
	path: string
	chunk: string
}

export type Asset = {
	filename: string | { name: string }
	chunk: string
}
