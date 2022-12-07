import { resolve } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const config = {
	typescript: {
		configFile: resolve('tsconfig.json'),
		diagnosticOptions: {
			semantic: true,
			syntactic: true
		}
	}
}
export const tsChecker = new ForkTsCheckerWebpackPlugin(config)
