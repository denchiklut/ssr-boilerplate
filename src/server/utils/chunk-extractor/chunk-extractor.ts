import { readFileSync } from 'fs'
import invariant from 'tiny-invariant'
import { joinPath } from 'src/common/path'
import type { StatsCompilation } from 'webpack'
import { getAssets, getFileScriptType, isValidChunkAsset } from './stats.utils'
import type { ChunkAsset, ChunkExtractorOptions } from './stats.types'

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
		invariant(chunkGroup, `cannot find ${chunk} in stats`)

		return chunkGroup
	}

	private createChunkAsset({ filename, chunk, type, linkType }: any): ChunkAsset {
		const resolvedFilename =
			typeof filename === 'object' && filename.name ? filename.name : filename
		const resolvedIntegrity =
			typeof filename === 'object' && filename.integrity ? filename.integrity : null

		return {
			filename: resolvedFilename,
			integrity: resolvedIntegrity,
			scriptType: getFileScriptType(resolvedFilename),
			url: joinPath(this.publicPath, resolvedFilename),
			path: joinPath(this.outputPath, resolvedFilename),
			linkType,
			chunk,
			type
		}
	}

	private getChunkAssets(chunks: string[] | string): ChunkAsset[] {
		const one = (chunk: string) => {
			const chunkGroup = this.getChunkGroup(chunk)
			return (
				chunkGroup.assets
					?.map(filename =>
						this.createChunkAsset({
							filename,
							chunk,
							type: 'mainAsset',
							linkType: 'preload'
						})
					)
					.filter(isValidChunkAsset) ?? []
			)
		}

		if (Array.isArray(chunks)) return getAssets(chunks, one)
		return one(chunks)
	}

	public getMainAssets() {
		const chunks = [...this.entrypoints]

		return this.getChunkAssets(chunks)
	}
}
