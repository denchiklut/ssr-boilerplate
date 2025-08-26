import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'
import type { ExternalItem } from '@rspack/core'
import nodeExternals from 'webpack-node-externals'
import * as plugins from '../plugins'
import * as rules from '../rules'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../utils'

export default defineConfig({
	name: 'server',
	target: 'node',
	context: ROOT_DIR,
	mode: IS_DEV ? 'development' : 'production',
	entry: './src/client/components/@shared/app',
	output: {
		path: join(DIST_DIR, 'client'),
		filename: 'js/app.server.js',
		publicPath: '/',
		library: {
			type: 'commonjs2'
		}
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx']
	},
	module: {
		rules: [rules.typescript]
	},
	plugins: [plugins.definePlugin({ server: true }), plugins.limitPlugin],
	externals: [nodeExternals() as ExternalItem],
	externalsPresets: { node: true }
})
