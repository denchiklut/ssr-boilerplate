import type { Configuration } from 'webpack'
import * as rules from '../rules'
import * as plugins from '../plugins'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../env'
import { devServerUrl } from '../utils/devServer'

const config: Configuration = {
	name: 'client',
	target: 'web',
	devtool: IS_DEV ? 'eval-cheap-module-source-map' : 'source-map',
	context: ROOT_DIR,
	mode: IS_DEV ? 'development' : 'production',
	entry: [IS_DEV && 'webpack-hot-middleware/client?name=client', './src/client'].filter(Boolean),
	output: {
		path: DIST_DIR,
		filename: IS_DEV ? '[name].client.js' : '[name].[contenthash].client.js',
		publicPath: IS_DEV ? devServerUrl : '/'
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
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
		plugins: [plugins.tsPaths]
	},
	plugins: [
		plugins.loadablePlugin,
		plugins.miniCssExtractPlugin,
		plugins.refreshPlugin,
		plugins.hmr,
		plugins.definePlugin()
	].filter(Boolean)
}

export default config
