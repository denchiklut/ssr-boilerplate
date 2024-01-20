import type { ChunkExtractor } from '@loadable/server'
import type { EmotionCache } from '@emotion/react'

export interface AppProps {
	nonce: string
	chunkExtractor?: ChunkExtractor
	emotionCache: EmotionCache
}
