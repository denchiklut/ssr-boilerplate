import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'

import renderBundle from './renderBundle'

const config = require('/webpack/configs/client.config').default
const compiler = webpack({ ...config, mode: 'development' })

export default [
    devMiddleware(compiler, {
        publicPath: config.output.publicPath
    }),
    hotMiddleware(compiler, { path: '/__webpack_hmr' }),
    renderBundle
]
