import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'

import * as env from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'client',
	target: 'browserslist',
	context: env.ROOT_DIR,
	mode: env.IS_DEV ? 'development' : 'production',
	devtool: env.IS_DEV ? 'cheap-module-source-map' : 'source-map',
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
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
		tsConfig: join(env.ROOT_DIR, 'tsconfig.json')
	},
	module: {
		rules: [
			rules.typescriptRSC,
			rules.vendorRSC,
			rules.css,
			rules.fonts,
			rules.mediasRule,
			...rules.svg
		]
	},
	plugins: [
		plugins.css,
		plugins.hmr,
		plugins.copy,
		plugins.refresh,
		plugins.statsPlugin,
		plugins.pwa,
		plugins.rscClientPlugin,
		plugins.definePlugin(),
		...plugins.htmlWebpackPlugin()
	]
})
