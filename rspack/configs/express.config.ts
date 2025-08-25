import { join } from "path";
import { defineConfig } from "@rspack/cli";
import type { ExternalItem } from "@rspack/core";
import nodeExternals from 'webpack-node-externals';
import { DIST_DIR, ROOT_DIR } from "../utils";
import * as plugins from '../plugins'
import * as rules from '../rules'


export default defineConfig({
	name: 'express',
	target: 'node',
	context: ROOT_DIR,
	entry: './src/server/index.ts',
	output: {
		filename: 'index.js',
		path: join(DIST_DIR, 'server'),
		library: {
			type:'commonjs2',
		},
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
	},
	plugins: [
		plugins.definePlugin({ server: true }),
	],
	stats: false,
	module: {
		rules: [
			rules.typescript
		]
	},
	externals: [nodeExternals() as ExternalItem, /app.server.js/,],
	externalsPresets: { node: true },
	ignoreWarnings: [{ module: /express\/lib\/view\.js/, },],
})
