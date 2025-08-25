import { defineConfig } from '@rspack/cli'
import { DefinePlugin } from '@rspack/core'

export default [
	defineConfig({
		name: 'express',
		entry: { main: './src/server/index.ts' },
		output: { filename: 'express/index.js', clean: true },
		target: 'node',
		resolve: {
			modules: ['src', 'node_modules'],
			extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
		},
		plugins: [
			new DefinePlugin({
				IS_DEV: JSON.stringify(true),
				IS_SERVER: JSON.stringify(true),
				clientPrefix: JSON.stringify('CLIENT_'),
			})
		],
		module: {
			rules: [
				{
					test: /\.[jt]sx?$/,
					exclude: /node_modules/,
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: {
								syntax: "typescript",
								tsx: true,
								decorators: true,
							},
						},
					},
				}
			]
		},
		ignoreWarnings: [
			{
				module: /express\/lib\/view\.js/,
			},
		],
	}),
	defineConfig({
		name: 'client',
		entry: { main: './src/server/index.ts' },
		output: { filename: 'client/index.js', clean: true }
	})
]
