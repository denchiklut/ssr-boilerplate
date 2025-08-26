import { rspack } from '@rspack/core'

export const limitPlugin = new rspack.optimize.LimitChunkCountPlugin({
	maxChunks: 1
})
