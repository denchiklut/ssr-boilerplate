import type { ChunkExtractor } from '@loadable/server'
import type { HelmetServerState } from 'react-helmet-async'

export interface Options {
	reactHtml: string
	chunkExtractor: ChunkExtractor
	nonce: string
	helmet: HelmetServerState
}
