import type { Configuration } from 'webpack'
import { IS_PROD } from './env'

export const optimization: Configuration['optimization'] = IS_PROD
	? { splitChunks: { chunks: 'all' } }
	: undefined
