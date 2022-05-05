import { optimize } from 'webpack'

export const limitPlugin = new optimize.LimitChunkCountPlugin({ maxChunks: 1 })
