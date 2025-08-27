import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'

import * as env from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'client',
	target: 'web',
	context: env.ROOT_DIR,
	mode: env.IS_DEV ? 'development' : 'production',
	devtool: env.IS_DEV ? 'eval-cheap-module-source-map' : 'source-map',
	entry: [
		env.IS_DEV && 'webpack-hot-middleware/client?name=client',
		'./src/client/index.tsx'
	].filter(Boolean),
	output: {
		path: join(env.DIST_DIR, 'client'),
		filename: 'js/[name].[fullhash].js',
		publicPath: env.PUBLIC_PATH
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css']
	},
	module: {
		rules: [rules.typescript, rules.css, rules.fontsRule, rules.mediasRule]
	},
	plugins: [
		plugins.css,
		plugins.hmr,
		plugins.copy,
		plugins.refresh,
		plugins.statsPlugin,
		plugins.definePlugin(),
		...plugins.htmlWebpackPlugin()
	]
})
