import { join } from "path";
import { defineConfig } from "@rspack/cli";

import { DIST_DIR, ROOT_DIR, IS_DEV } from "../utils";
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'client',
	target: 'web',
	context: ROOT_DIR,
	mode: IS_DEV ? 'development': 'production',
	entry: [IS_DEV && 'webpack-hot-middleware/client?name=client', './src/client/index.tsx'].filter(Boolean),
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
	plugins: [
		plugins.copy,
		plugins.hmr,
		plugins.refresh,
		plugins.definePlugin(),
		plugins.statsPlugin,
		...plugins.htmlWebpackPlugin()
	],
})
