import { join } from 'path'
import { defineConfig } from '@rspack/cli'
import * as plugins from '../plugins'
import * as rules from '../rules'

import { DIST_DIR, ROOT_DIR } from "../utils";


export default defineConfig({
	name: 'spa',
	target: 'web',
	context: ROOT_DIR,
	entry: './src/client/index.tsx',
	output: {
		path: join(DIST_DIR, 'client'),
		filename: 'js/[name].[fullhash].js',
		publicPath: '/',
		clean: true
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
		plugins.hmr,
		plugins.refresh,
		plugins.definePlugin({ spa: true }),
		...plugins.htmlWebpackPlugin({ spa: true })
	],
	devServer: {
		static: { directory: join(ROOT_DIR, 'public') }
	}
})
