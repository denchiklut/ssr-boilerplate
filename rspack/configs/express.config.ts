import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'
import type { ExternalItem } from '@rspack/core'
import nodeExternals from 'webpack-node-externals'
import * as plugins from '../plugins'
import * as rules from '../rules'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../utils'

export default defineConfig({
	name: 'express',
	target: 'node',
	context: ROOT_DIR,
	mode: IS_DEV ? 'development' : 'production',
	entry: './src/server/index.ts',
	output: {
		filename: 'index.js',
		path: join(DIST_DIR, 'server'),
		library: {
			type: 'commonjs2'
		}
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx']
	},
	plugins: [plugins.definePlugin({ server: true }), plugins.limitPlugin],
	module: {
		rules: [rules.typescript]
	},
	externals: [nodeExternals() as ExternalItem, /app.server.js/],
	externalsPresets: { node: true },
	ignoreWarnings: [{ module: /express\/lib\/view\.js/ }]
})
