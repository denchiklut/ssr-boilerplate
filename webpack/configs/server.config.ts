import { join } from 'path'
import type { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { DIST_DIR, IS_DEV, PUBLIC_PATH, ROOT_DIR } from '../utils'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default {
	name: 'server',
	target: 'node',
	context: ROOT_DIR,
	externalsPresets: { node: true },
	devtool: IS_DEV ? false : 'source-map',
	entry: './src/client/components/@shared/app',
	mode: IS_DEV ? 'development' : 'production',
	output: {
		filename: 'js/app.server.js',
		libraryTarget: 'commonjs2',
		path: join(DIST_DIR, 'client'),
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
		plugins.miniCssExtractPlugin,
		plugins.limitPlugin,
		plugins.definePlugin({ server: true })
	],
	externals: [nodeExternals()]
} satisfies Configuration
