import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

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
