import type { StatsCompilation } from 'webpack'

export type ChunkExtractorOptions = {
	entrypoints?: string | string[]
	outputPath?: string
	publicPath?: string
} & ({ statsFile: string } | { stats: StatsCompilation })

export interface ChunkAsset {
	filename: string
	scriptType: Nullable<string>
	url: string
	chunk: string
}

export type Asset = {
	filename: string | { name: string }
	chunk: string
}
