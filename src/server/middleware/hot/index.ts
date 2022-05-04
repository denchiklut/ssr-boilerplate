import { resolve } from 'path'
import webpack, { type Configuration } from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import config from '../../../../webpack/configs/client.config'
import { render } from '../render'

export const hot = () => {
    const isDev = process.env.NODE_ENV === 'development'
    const compiler = webpack({
        ...config,
        mode: isDev ? 'development' : 'production',
        context: resolve(__dirname, '../../../../..')
    } as Configuration)

    return [
        isDev &&
            devMiddleware(compiler, {
                publicPath: config.output.publicPath
            }),
        isDev && hotMiddleware(compiler),
        render
    ].filter(Boolean)
}
