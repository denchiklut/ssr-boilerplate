import { readFileSync } from 'node:fs'
import type { StatsCompilation } from '@rspack/core'
import invariant from 'tiny-invariant'
import { joinPath } from '../../../common/path'
import type { Asset, ChunkAsset, ChunkExtractorOptions } from './types'
import { getAssets, getFileScriptType, isValidChunkAsset } from './utils'

export class ChunkExtractor {
	private stats: StatsCompilation
	private readonly publicPath: string
	private readonly outputPath: string
	private readonly entrypoints: string[]

	constructor({
		stats,
		publicPath,
		statsFile,
		outputPath,
		entrypoints = ['main']
	}: ChunkExtractorOptions) {
		this.stats = stats ?? JSON.parse(readFileSync(statsFile ?? '').toString())
		this.entrypoints = Array.isArray(entrypoints) ? entrypoints : [entrypoints]
		this.publicPath = publicPath ?? this.stats.publicPath ?? ''
		this.outputPath = outputPath ?? this.stats.outputPath ?? ''
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
			path: joinPath(this.outputPath, resolvedFilename),
			chunk
		}
	}

	private getChunkAssets(chunks: string[] | string): ChunkAsset[] {
		const one = (chunk: string) => {
			const chunkGroup = this.getChunkGroup(chunk)

			if (!chunkGroup.assets) return []

			return chunkGroup.assets
				.map(filename =>
					this.createChunkAsset({
						filename,
						chunk
					})
				)
				.filter(isValidChunkAsset)
		}

		if (Array.isArray(chunks)) return getAssets(chunks, one)
		return one(chunks)
	}

	public getMainAssets() {
		return this.getChunkAssets(this.entrypoints)
	}
}
