import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

/**
 * You can set `async` prop. If true, reports issues after webpack's compilation is done.
 * Thanks to that it doesn't block the compilation. Used only in the watch mode.
 * @default: compiler.options.mode === 'development'
 * @see https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#options
 */
export const tsChecker = new ForkTsCheckerWebpackPlugin({
	devServer: false,
	typescript: {
		configFile: resolve('tsconfig.json'),
		diagnosticOptions: {
			semantic: true,
			syntactic: true
		}
	}
})
