import { join } from "path";
import { defineConfig } from "@rspack/cli";

import { DIST_DIR, ROOT_DIR } from "../utils";
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'client',
	target: 'web',
	context: ROOT_DIR,
	entry: './src/client/index.tsx',
	output: {
		path: join(DIST_DIR, 'client'),
		filename: 'js/[name].[fullhash].js',
		publicPath: '/'
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	module: {
		rules: [
			rules.typescript
		]
	},
	stats: { chunks: true, modules: true, entrypoints: true, assets: true, publicPath: true, },
	plugins: [
		plugins.copy,
		plugins.hmr,
		plugins.refresh,
		plugins.definePlugin(),
		plugins.statsPlugin,
		...plugins.htmlWebpackPlugin()
	],
})
