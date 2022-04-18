import webpack, { type Configuration } from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import config from '../../../../webpack/configs/client.config'
import { render } from '../render'

export const hot = () => {
    const compiler = webpack({ ...(config as Configuration), mode: 'development' })
    return [
        IS_DEV &&
            devMiddleware(compiler, {
                publicPath: config.output.publicPath
            }),
        IS_DEV && hotMiddleware(compiler),
        render
    ].filter(Boolean)
}
