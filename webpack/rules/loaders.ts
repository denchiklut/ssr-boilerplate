import { resolve } from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { SRC_DIR, IS_DEV } from '../utils'

export const cssLoader = {
	loader: 'css-loader'
}

export const postCssLoader = {
	loader: 'postcss-loader',
	options: {
		postcssOptions: {
			config: './config/postcss/postcss.js'
		}
	}
}

/**
 * @see https://webpack.js.org/plugins/mini-css-extract-plugin/#root
 */
export const miniCssExtractLoader = {
	loader: MiniCssExtractPlugin.loader
}

/**
 * @see https://webpack.js.org/loaders/sass-loader/#root
 */
export const sassLoader = {
	loader: 'sass-loader',
	options: {
		sassOptions: {
			includePaths: [resolve(SRC_DIR, 'client/styles')]
		}
	}
}

export const babelLoader = {
	loader: 'babel-loader',
	options: {
		cacheDirectory: IS_DEV
	}
}
