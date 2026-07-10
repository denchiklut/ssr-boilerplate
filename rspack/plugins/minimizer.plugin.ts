import { SwcJsMinimizerRspackPlugin } from '@rspack/core'

export const jsMinimizer = new SwcJsMinimizerRspackPlugin({
	minimizerOptions: { mangle: false, compress: { keep_fnames: true } }
})
