import webpack, { Configuration } from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import { render } from '../render'

export const hot = (config: Configuration) => {
    const compiler = webpack({ ...config, mode: 'development' })

    return [
        devMiddleware(compiler, {
            publicPath: config.output.publicPath
        }),
        hotMiddleware(compiler),
        render
    ]
}
