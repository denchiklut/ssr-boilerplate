process.env.NODE_ENV = 'development'

import webpack, { type Configuration } from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from '../webpack/configs/spa.config'

const compiler = webpack(webpackConfig as Configuration)
const devServerOptions = { ...webpackConfig.devServer, open: true }
const server = new WebpackDevServer(devServerOptions, compiler)

server.startCallback(() => {
    console.log('Successfully started server on http://localhost:5000')
})
