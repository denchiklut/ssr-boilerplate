import { join } from 'path'
import type { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../utils'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default {
	name: 'express',
	target: 'node',
	devtool: IS_DEV ? false : 'source-map',
	externalsPresets: { node: true },
	entry: './src/server',
	mode: IS_DEV ? 'development' : 'production',
	context: ROOT_DIR,
	output: {
		filename: 'index.js',
		libraryTarget: 'commonjs2',
		path: join(DIST_DIR, 'server')
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
} satisfies Configuration
