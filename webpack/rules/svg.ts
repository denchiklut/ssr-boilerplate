import { babelLoader } from './loaders'

/**
 * Using @svgr/webpack for handling svg files in react components
 * @see https://react-svgr.com/docs/webpack/
 */
export const svgReactComponentRule = {
	test: /\.icon.svg$/,
	issuer: /\.[jt]sx$/,
	use: [
		babelLoader,
		{
			loader: '@svgr/webpack',
			options: { babel: false }
		}
	]
}

/**
 * Using file-loader for handling svg files
 * @see https://webpack.js.org/guides/asset-modules/
 */
export const svgRule = {
	test: /\.svg$/,
	issuer: { not: [/\.[jt]sx$/] },
	type: 'asset/inline'
}

export const svgRules = [svgReactComponentRule, svgRule]
