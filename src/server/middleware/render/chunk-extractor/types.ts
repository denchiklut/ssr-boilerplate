import type { StatsCompilation } from '@rspack/core'

export interface ChunkExtractorOptions {
	stats?: StatsCompilation
	statsFile?: string
	publicPath?: string
	outputPath?: string
	entrypoints?: string | string[]
}

export interface ChunkAsset {
	filename: string
	scriptType: Nullable<'script' | 'style'>
	url: string
	path: string
	chunk: string
}

export type Asset = {
	filename: string | { name: string }
	chunk: string
}
