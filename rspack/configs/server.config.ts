import { join } from 'node:path'
import { defineConfig } from '@rspack/cli'
import { LightningCssMinimizerRspackPlugin } from '@rspack/core'

import * as env from '../env'
import * as plugins from '../plugins'
import * as rules from '../rules'

const rscEntry = join(env.SRC_DIR, 'server/middleware/render/rsc.tsx')
const ssrModule = join(env.SRC_DIR, 'server/middleware/render/ssr.tsx')

export default defineConfig({
	name: 'server',
	target: 'node',
	context: env.ROOT_DIR,
	devtool: env.IS_DEV ? false : 'source-map',
	mode: env.IS_DEV ? 'development' : 'production',
	entry: rscEntry,
	output: {
		path: join(env.DIST_DIR, 'client'),
		filename: 'js/app.server.js',
		library: { type: 'commonjs2' },
		publicPath: env.PUBLIC_PATH
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
		tsConfig: join(env.ROOT_DIR, 'tsconfig.json')
	},
	module: {
		rules: [
			{ resource: ssrModule, layer: plugins.Layers.ssr },
			{
				resource: rscEntry,
				layer: plugins.Layers.rsc,
				resolve: { conditionNames: ['react-server', '...'] }
			},
			{
				issuerLayer: plugins.Layers.rsc,
				exclude: ssrModule,
				resolve: { conditionNames: ['react-server', '...'] }
			},
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
		plugins.limitPlugin,
		plugins.rscServerPlugin,
		plugins.definePlugin({ server: true })
	],
	optimization: {
		minimizer: [plugins.jsMinimizer, new LightningCssMinimizerRspackPlugin()]
	}
})
