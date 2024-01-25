import invariant from 'tiny-invariant'
import type { StatsCompilation } from 'webpack'
import { joinPath } from 'src/common'
import { getAssets, getFileScriptType, isValidChunkAsset, readJsonSync } from './utils'
import { Asset, ChunkAsset, ChunkExtractorOptions } from './types'

export class ChunkExtractor {
	private stats: StatsCompilation
	private readonly publicPath: string
	private readonly entrypoints: string[]

	constructor({
		publicPath = '',
		outputPath = '',
		entrypoints = ['main'],
		...options
	}: ChunkExtractorOptions) {
		this.stats = 'stats' in options ? options.stats : readJsonSync(options.statsFile)
		this.entrypoints = Array.isArray(entrypoints) ? entrypoints : [entrypoints]
		this.publicPath = publicPath ?? this.stats.publicPath
	}

	private getChunkGroup(chunk: string) {
		const chunkGroup = this.stats.namedChunkGroups?.[chunk]
		invariant(chunkGroup, `Cannot find ${chunk} in stats`)

		return chunkGroup
	}

	private createChunkAsset({ filename, chunk }: Asset): ChunkAsset {
		const resolvedFilename = typeof filename === 'object' ? filename.name : filename

		return {
			filename: resolvedFilename,
			scriptType: getFileScriptType(resolvedFilename),
			url: joinPath(this.publicPath, resolvedFilename),
			chunk
		}
	}

	private getChunkAssets(chunks: string[] | string): ChunkAsset[] {
		const one = (chunk: string) => {
			const chunkGroup = this.getChunkGroup(chunk)

			if (!chunkGroup.assets) return []

			return chunkGroup.assets
				.map(filename => this.createChunkAsset({ filename, chunk }))
				.filter(isValidChunkAsset)
		}

		if (Array.isArray(chunks)) return getAssets(chunks, one)
		return one(chunks)
	}

	public getMainAssets() {
		return this.getChunkAssets(this.entrypoints)
	}
}
