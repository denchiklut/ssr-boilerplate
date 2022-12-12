import type { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../env'

const config: Configuration = {
	name: 'express',
	target: 'node',
	devtool: IS_DEV ? false : 'source-map',
	externalsPresets: { node: true },
	entry: './src/server',
	mode: IS_DEV ? 'development' : 'production',
	context: ROOT_DIR,
	output: {
		filename: 'express.js',
		libraryTarget: 'commonjs2',
		path: DIST_DIR,
		publicPath: '/'
	},
	module: {
		rules: [rules.javascriptRule, rules.typescriptRule]
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
		plugins: [plugins.tsPaths]
	},
	plugins: [plugins.limitPlugin, plugins.definePlugin({ server: true })],
	externals: [nodeExternals(), /app.server.js/]
}

export default config
