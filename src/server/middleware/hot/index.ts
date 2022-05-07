import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpackConfigs from '../../../../webpack.config'
import { render } from '../render'

export const hot = () => {
	const isDev = process.env.NODE_ENV === 'development'
	const compiler = webpack(webpackConfigs)

	return [
		isDev &&
			devMiddleware(compiler, {
				publicPath: webpackConfigs[0].output.publicPath,
				serverSideRender: true
			}),
		isDev && hotMiddleware(compiler),
		render
	].filter(Boolean)
}
