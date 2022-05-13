import { babelLoader } from './loaders'

/**
 * @see https://webpack.js.org/guides/typescript/#loader
 */
export const typescriptRule = {
	test: /\.tsx?$/,
	use: [babelLoader],
	exclude: /node_modules/
}

/**
 * @see https://webpack.js.org/loaders/babel-loader
 */
export const javascriptRule = {
	test: /\.jsx?$/,
	use: [babelLoader],
	exclude: /node_modules/
}

/**
 * @see https://webpack.js.org/loaders/html-loader
 */
export const htmlRule = {
	test: /\.(html)$/,
	use: {
		loader: 'html-loader'
	}
}

/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const mediasRule = {
	test: /\.(?:ico|gif|png|jpg|jpeg|ogg)$/i,
	type: 'asset/resource'
}

/**
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const fontsRule = {
	test: /\.(woff(2)?|eot|ttf|otf|)$/,
	type: 'asset/inline'
}
