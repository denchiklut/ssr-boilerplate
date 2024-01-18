import type { ChunkExtractor } from '@loadable/server'

export interface AppProps {
	nonce: string
	chunkExtractor?: ChunkExtractor
}
