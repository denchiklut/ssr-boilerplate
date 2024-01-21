import { extname } from 'path'
import type { ChunkAsset } from './stats.types'

function cleanFileName(name: string): string {
	return name.split('?')[0] ?? ''
}

function extensionToScriptType(extension: string) {
	const EXTENSION_SCRIPT_TYPES: Collection<string, string> = {
		'.js': 'script',
		'.mjs': 'script',
		'.css': 'style'
	}

	return EXTENSION_SCRIPT_TYPES[extension] ?? null
}

export function getFileScriptType(fileName: string) {
	return extensionToScriptType(cleanFileName(extname(fileName)).toLowerCase())
}
export function isValidChunkAsset(chunkAsset: ChunkAsset) {
	return chunkAsset.scriptType && !/\.hot-update\.js$/.test(chunkAsset.filename)
}

export function getAssets(chunks: string[], getAsset: (chunk: string) => ChunkAsset[] | undefined) {
	const seenUrls = new Set()
	return chunks
		.map(getAsset)
		.flat()
		.filter(asset => {
			if (asset && !seenUrls.has(asset.url)) {
				seenUrls.add(asset.url)
				return true
			}
			return false
		})
		.filter(Boolean)
}
