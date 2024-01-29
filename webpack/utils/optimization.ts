import type { Configuration } from 'webpack'
import { EsbuildPlugin } from 'esbuild-loader'
import { IS_PROD } from './env'

type Optimization = Configuration['optimization']
type Options = { client?: boolean }

export const optimization: (options?: Options) => Optimization = ({ client = false } = {}) => ({
	splitChunks: IS_PROD && client ? { chunks: 'all' } : false,
	minimizer: [IS_PROD && new EsbuildPlugin()].filter(Boolean)
})
