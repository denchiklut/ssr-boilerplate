import { extname } from 'node:path'
import type { ChunkAsset } from './types'

export function getFileScriptType(fileName: string) {
	const extension = extname(fileName).split('?')[0] ?? ''
	const script_types: Collection<string, 'script' | 'style'> = {
		'.js': 'script',
		'.mjs': 'script',
		'.css': 'style'
	}

	return script_types[extension] ?? null
}

export function isValidChunkAsset(chunkAsset: ChunkAsset) {
	return chunkAsset.scriptType && !/\.hot-update\.js$/.test(chunkAsset.filename)
}

export function getAssets(chunks: string[], getAsset: (chunk: string) => ChunkAsset[] | undefined) {
	const seenUrls = new Set()

	return chunks
		.flatMap(getAsset)
		.filter(asset => {
			if (asset && !seenUrls.has(asset.url)) {
				seenUrls.add(asset.url)
				return true
			}
			return false
		})
		.filter(Boolean)
}
