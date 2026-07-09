import { resolve } from 'node:path'
import { rspack } from '@rspack/core'

import { SRC_DIR } from '../env'

const swc = (reactServerComponents: boolean) => ({
	test: /\.[jt]sx?$/,
	type: 'javascript/auto',
	exclude: [/[\\/]node_modules[\\/]/],
	use: {
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
					}
				}
			},
			rspackExperiments: { reactServerComponents }
		}
	}
})

export const typescript = swc(false)

/** Parses `'use client'` / `'use server'` directives — for the RSC-aware compilers only. */
export const typescriptRSC = swc(true)

/**
 * react-router marks its client boundary with a `'use client'` directive inside its
 * dist files (`internal/react-server-client`), so it needs the RSC transform too.
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
		// no `issuer` condition: RSC-injected modules can have query-suffixed or virtual issuers
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
