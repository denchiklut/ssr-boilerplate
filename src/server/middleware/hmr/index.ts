import { render } from '../render'

export const hmr = () => {
	if (IS_DEV) {
		const { rspack } = require('@rspack/core')
		const wdm = require('webpack-dev-middleware')
		const whm = require('webpack-hot-middleware')
		const configs = require('../../../../rspack.config').default
		const publicPath = configs[1]?.output?.publicPath
		const compiler = rspack(configs.slice(1))

		return [
			wdm(compiler, {
				publicPath,
				serverSideRender: true
			}),
			whm(compiler),
			render
		]
	}

	return [render]
}
