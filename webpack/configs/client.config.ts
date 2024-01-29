import { join } from 'path'
import type { Configuration } from 'webpack'
import { DIST_DIR, IS_DEV, ROOT_DIR, PUBLIC_PATH, optimization } from '../utils'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default {
	name: 'client',
	target: 'web',
	devtool: IS_DEV ? 'eval-cheap-module-source-map' : 'source-map',
	context: ROOT_DIR,
	mode: IS_DEV ? 'development' : 'production',
	entry: [IS_DEV && 'webpack-hot-middleware/client?name=client', './src/client'].filter(Boolean),
	output: {
		path: join(DIST_DIR, 'client'),
		filename: IS_DEV ? 'js/[name].client.js' : 'js/[name].[contenthash].client.js',
		publicPath: PUBLIC_PATH
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
		plugins.statsPlugin,
		plugins.miniCssExtractPlugin,
		plugins.refreshPlugin,
		plugins.workboxBoxPlugin,
		plugins.tsChecker,
		plugins.copyPlugin,
		plugins.analyzePlugin,
		plugins.hmr,
		plugins.definePlugin(),
		...plugins.htmlWebpackPlugin()
	].filter(Boolean),
	optimization: optimization({ client: true })
} satisfies Configuration
