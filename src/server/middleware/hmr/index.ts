import { render } from '../render'

export const hmr = () => {
	if (IS_DEV) {
		const webpack = require('webpack')
		const wdm = require('webpack-dev-middleware')
		const whm = require('webpack-hot-middleware')
		const configs = require('../../../../webpack.config').default
		const publicPath = configs[1]?.output?.publicPath
		const compiler = webpack(configs.slice(1))

		return [wdm(compiler, { publicPath, serverSideRender: true }), whm(compiler), render]
	}

	return [render]
}
