import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'

import * as env from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'spa',
	target: 'web',
	context: env.ROOT_DIR,
	devtool: 'eval-cheap-module-source-map',
	entry: './src/client/index.tsx',
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
		rules: [rules.typescript, rules.css, rules.fontsRule, rules.mediasRule]
	},
	plugins: [
		plugins.css,
		plugins.hmr,
		plugins.refresh,
		plugins.definePlugin({ spa: true }),
		...plugins.htmlWebpackPlugin({ spa: true })
	],
	devServer: {
		port: 3000,
		static: {
			directory: join(env.ROOT_DIR, 'public')
		}
	}
})
