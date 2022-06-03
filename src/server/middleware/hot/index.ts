import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import webpackConfigs from '../../../../webpack.config'
import { render } from '../render'

export const hot = () => {
	const compiler = webpack(webpackConfigs)

	return [
		IS_DEV &&
			devMiddleware(compiler, {
				publicPath: webpackConfigs[0].output.publicPath,
				serverSideRender: true
			}),
		IS_DEV && hotMiddleware(compiler),
		render
	].filter(Boolean)
}
