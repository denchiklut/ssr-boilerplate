import { Configuration } from 'webpack'
import { devServerConfig } from '../utils/devServer'
import { DIST_DIR, ROOT_DIR } from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

const config = {
	name: 'spa',
	target: 'web',
	devtool: 'eval-cheap-module-source-map',
	mode: 'development',
	context: ROOT_DIR,
	entry: './src/client',
	output: {
		path: DIST_DIR,
		publicPath: '/',
		filename: 'js/[name].[fullhash].js'
	},
	module: {
		rules: [
			rules.javascriptRule,
			rules.typescriptRule,
			rules.htmlRule,
			rules.mediasRule,
			rules.fontsRule,
			rules.cssRule,
			...rules.svgRules
		]
	},
	devServer: devServerConfig,
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
		plugins: [plugins.tsPaths]
	},
	plugins: [
		plugins.loadablePlugin,
		plugins.miniCssExtractPlugin,
		plugins.refreshPlugin,
		plugins.tsChecker,
		plugins.htmlWebpackPlugin,
		plugins.definePlugin({ spa: true })
	].filter(Boolean)
} as Configuration

export default config
