import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'
import type { ExternalItem } from '@rspack/core'
import nodeExternals from 'webpack-node-externals'

import * as env from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'server-components',
	target: 'node',
	context: env.ROOT_DIR,
	devtool: env.IS_DEV ? false : 'source-map',
	mode: env.IS_DEV ? 'development' : 'production',
	entry: './src/server-components/index.ts',
	output: {
		path: join(env.DIST_DIR, 'server-components'),
		filename: 'index.js',
		library: { type: 'commonjs2' },
		publicPath: '/'
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
		tsConfig: join(env.ROOT_DIR, 'tsconfig.json'),
		conditionNames: ['react-server', 'node', 'import']
	},
	module: {
		rules: [rules.typescript, rules.css, rules.fonts, rules.mediasRule, ...rules.svg]
	},
	plugins: [plugins.css, plugins.limitPlugin, plugins.definePlugin({ server: true })],
	externals: [nodeExternals() as ExternalItem],
	experiments: {
		layers: true
	}
})