import { resolve } from 'node:path'
import { rspack } from '@rspack/core'

import { SRC_DIR } from '../env'

export const typescript = {
	test: /\.[jt]sx?$/,
	exclude: /node_modules/,
	type: 'javascript/auto',
	loader: 'builtin:swc-loader',
	options: {
		jsc: {
			parser: { syntax: 'typescript', tsx: true, decorators: true },
			transform: {
				decoratorVersion: '2022-03',
				react: { runtime: 'automatic' }
			},
			target: 'esnext'
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
		issuer: /\.[jt]sx?$/,
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
