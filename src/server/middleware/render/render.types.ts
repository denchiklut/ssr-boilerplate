import type { ChunkExtractor } from '@loadable/server'

export interface Options {
	reactHtml: string
	chunkExtractor: ChunkExtractor
	nonce: string
}
