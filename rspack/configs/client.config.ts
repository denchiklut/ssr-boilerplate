import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'
import * as plugins from '../plugins'
import * as rules from '../rules'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../utils'

export default defineConfig({
	name: 'client',
	target: 'web',
	context: ROOT_DIR,
	mode: IS_DEV ? 'development' : 'production',
	entry: [IS_DEV && 'webpack-hot-middleware/client?name=client', './src/client/index.tsx'].filter(
		Boolean
	),
	output: {
		path: join(DIST_DIR, 'client'),
		filename: 'js/[name].[fullhash].js',
		publicPath: '/'
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx']
	},
	module: {
		rules: [rules.typescript]
	},
	plugins: [
		plugins.copy,
		plugins.hmr,
		plugins.refresh,
		plugins.definePlugin(),
		plugins.statsPlugin,
		...plugins.htmlWebpackPlugin()
	]
})
