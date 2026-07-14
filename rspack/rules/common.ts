import { resolve } from 'node:path'
import { experiments, rspack } from '@rspack/core'

import { SRC_DIR } from '../env'

const { Layers } = experiments.rsc

const swc = (reactServerComponents: boolean, reactCompiler: boolean) => ({
	loader: 'builtin:swc-loader',
	options: {
		jsc: {
			parser: {
				syntax: 'typescript',
				tsx: true,
				decorators: true
			},
			transform: {
				decoratorVersion: '2022-03',
				react: {
					runtime: 'automatic'
				},
				reactCompiler
			}
		},
		rspackExperiments: { reactServerComponents }
	}
})

const scripts = {
	test: /\.[jt]sx?$/,
	type: 'javascript/auto',
	exclude: [/[\\/]node_modules[\\/]/]
}

export const typescript = { ...scripts, use: swc(false, true) }

/**
 * Parses `'use client'` / `'use server'` directives — for the RSC-aware compilers only.
 *
 * React Compiler is disabled in the react-server layer: `react/compiler-runtime` reads
 * `__CLIENT_INTERNALS` from `react`, which the `react-server` build doesn't export, so
 * compiled server components crash the Flight render (and memoization is useless there —
 * server components render once per request).
 */
export const typescriptRSC = {
	...scripts,
	oneOf: [{ issuerLayer: Layers.rsc, use: swc(true, false) }, { use: swc(true, true) }]
}

/**
 * react-router marks its client boundary with a `'use client'` directive inside its
 * dist files, so the RSC swc transform must run over react-router in both compilers.
 * The boundary file is compiled separately by `vendorReactRouter`, so exclude it here
 * to avoid running two loaders over the same module.
 */
export const vendorRSC = {
	test: /\.m?js$/,
	include: [/node_modules[\\/]react-router[\\/]/],
	use: {
		loader: 'builtin:swc-loader',
		options: {
			jsc: { parser: { syntax: 'ecmascript' } },
			rspackExperiments: { reactServerComponents: true }
		}
	}
}

export const css = {
	test: /\.(sa|sc|c)ss$/,
	type: 'javascript/auto',
	use: [
		rspack.CssExtractRspackPlugin.loader,
		{
			loader: 'css-loader',
			options: {
				modules: {
					namedExport: false,
					exportLocalsConvention: 'camelCaseOnly',
					localIdentName: '[local]__[contenthash:base64:5]'
				}
			}
		},
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					config: './config/postcss/postcss.js'
				}
			}
		},
		{
			loader: 'sass-loader',
			options: {
				sassOptions: {
					loadPaths: [resolve(SRC_DIR, 'client/styles')]
				}
			}
		}
	]
}

export const mediasRule = {
	test: /\.(?:ico|gif|png|jpg|jpeg|ogg)$/i,
	type: 'asset/resource',
	generator: {
		filename: 'icons/[name][ext][query]'
	}
}

export const svg = [
	{
		test: /\.icon.svg$/i,
		use: ['@svgr/webpack']
	},
	{
		test: /\.svg$/,
		exclude: /\.icon.svg$/,
		type: 'asset/inline'
	}
]

export const fonts = {
	test: /\.(woff(2)?|eot|ttf|otf|)$/,
	type: 'asset/resource',
	generator: {
		filename: 'fonts/[name][ext][query]'
	}
}
