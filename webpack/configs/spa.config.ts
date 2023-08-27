import { join } from 'path'
import { Configuration } from 'webpack'
import { DIST_DIR, ROOT_DIR, devServerConfig } from '../utils'
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
		path: join(DIST_DIR, 'client'),
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
		plugins.definePlugin({ spa: true }),
		...plugins.htmlWebpackPlugin({ spa: true })
	].filter(Boolean)
} as Configuration

export default config
