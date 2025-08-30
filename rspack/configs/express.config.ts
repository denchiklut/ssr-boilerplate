import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'
import type { ExternalItem } from '@rspack/core'
import nodeExternals from 'webpack-node-externals'

import * as env from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'express',
	target: 'node',
	context: env.ROOT_DIR,
	devtool: env.IS_DEV ? false : 'source-map',
	mode: env.IS_DEV ? 'development' : 'production',
	entry: './src/server/index.ts',
	output: {
		filename: 'index.js',
		path: join(env.DIST_DIR, 'server'),
		library: { type: 'commonjs2' }
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
		tsConfig: join(env.ROOT_DIR, 'tsconfig.json')
	},
	plugins: [plugins.definePlugin({ server: true }), plugins.limitPlugin],
	module: {
		rules: [rules.typescript]
	},
	externals: [nodeExternals() as ExternalItem, /app.server.js/],
	ignoreWarnings: [{ module: /express\/lib\/view\.js/ }]
})
