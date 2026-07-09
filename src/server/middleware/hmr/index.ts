import { render } from '../render'

export const hmr = () => {
	if (IS_DEV) {
		const { rspack } = require('@rspack/core')
		const whm = require('webpack-hot-middleware')
		const wdm = require('@rspack/dev-middleware').devMiddleware
		const configs = require('../../../../rspack.config').default
		const { onRscChange } = require('../../../../rspack/plugins/rsc.plugin')
		const publicPath = configs[1]?.output?.publicPath
		const compiler = rspack(configs.slice(1))
		const hot = whm(compiler)

		// server components can't hot-update in the browser — tell clients to reload
		onRscChange(() => hot.publish({ action: 'rsc-update' }))

		return [wdm(compiler, { publicPath, serverSideRender: true }), hot, render]
	}

	return [render]
}
