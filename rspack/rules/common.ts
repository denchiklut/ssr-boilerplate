import { rspack } from '@rspack/core'

export const typescript = {
	test: /\.[jt]sx?$/,
	exclude: /node_modules/,
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
					react: {
						runtime: 'automatic'
					}
				}
			}
		}
	},
	type: 'javascript/auto'
}

export const css = {
	test: /\.css$/,
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

export const fontsRule = {
	test: /\.(woff(2)?|eot|ttf|otf|)$/,
	type: 'asset/resource',
	generator: {
		filename: 'fonts/[name][ext][query]'
	}
}
