import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import clientConfig from '../../../../webpack/configs/client.config'
import serverConfig from '../../../../webpack/configs/server.config'
import { render } from '../render'

export const hot = () => {
    const isDev = process.env.NODE_ENV === 'development'
    const compiler = webpack([clientConfig, serverConfig])

    return [
        isDev &&
            devMiddleware(compiler, {
                publicPath: clientConfig.output.publicPath,
                serverSideRender: true
            }),
        isDev && hotMiddleware(compiler),
        render
    ].filter(Boolean)
}
