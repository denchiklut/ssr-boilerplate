import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'
import { type ExternalItem, LightningCssMinimizerRspackPlugin } from '@rspack/core'
import nodeExternals from 'webpack-node-externals'

import * as env from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

export default defineConfig({
	name: 'server',
	target: 'node',
	context: env.ROOT_DIR,
	devtool: env.IS_DEV ? false : 'source-map',
	mode: env.IS_DEV ? 'development' : 'production',
	entry: './src/client/components/@shared/app',
	output: {
		path: join(env.DIST_DIR, 'client'),
		filename: 'js/app.server.js',
		library: { type: 'commonjs2' },
		publicPath: '/'
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
		tsConfig: join(env.ROOT_DIR, 'tsconfig.json')
	},
	module: {
		rules: [rules.typescript, rules.css, rules.fonts, rules.mediasRule, ...rules.svg]
	},
	plugins: [plugins.css, plugins.limitPlugin, plugins.definePlugin({ server: true })],
	optimization: {
		minimizer: [plugins.jsMinimizer, new LightningCssMinimizerRspackPlugin()]
	},
	externals: [nodeExternals() as ExternalItem]
})
