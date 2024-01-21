import type { Compilation, Compiler, sources, StatsChunk, WebpackPluginInstance } from 'webpack'

const name = 'stats-webpack-plugin'

interface Options {
	filename?: string
}
export class StatsPlugin implements WebpackPluginInstance {
	private opts: Required<Options>

	constructor(options = { filename: 'stats.json' }) {
		this.opts = options
	}

	private handleEmit = (compilation: Compilation) => {
		const stats = compilation.getStats().toJson({
			all: false,
			assets: true,
			cachedAssets: true,
			chunks: false,
			chunkGroups: true,
			chunkGroupChildren: true,
			hash: true,
			ids: true,
			outputPath: true,
			publicPath: true
		})

		stats.generator = name
		stats.chunks = [...compilation.chunks].map(chunk => ({
			id: chunk.id,
			files: [...chunk.files]
		})) as StatsChunk[]

		const result = JSON.stringify(stats, null, 2)

		return {
			source: () => result,
			size: () => result.length
		} as sources.Source
	}

	public apply(compiler: Compiler) {
		compiler.hooks.make.tap(name, compilation => {
			compilation.hooks.processAssets.tap(
				{
					name,
					stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT
				},
				() => {
					const asset = this.handleEmit(compilation)
					compilation.emitAsset(this.opts.filename, asset)
				}
			)
		})
	}
}
