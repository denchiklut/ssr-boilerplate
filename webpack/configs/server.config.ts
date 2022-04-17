import { join } from 'path'
import nodeExternals from 'webpack-node-externals'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { SRC_DIR, DIST_DIR } from '../env'

const config = {
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    node: { __dirname: false },
    entry: join(SRC_DIR, 'server'),
    output: {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
        path: DIST_DIR,
        publicPath: '/static/'
    },
    module: {
        rules: [
            rules.javascriptRule,
            rules.typescriptRule,
            rules.htmlRule,
            rules.mediasRule,
            rules.fontsRule,
            rules.cssRule,
            ...rules.svgRules
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
        plugins: [plugins.tsPaths]
    },
    plugins: [plugins.miniCssExtractPlugin, plugins.environmentPlugin, plugins.definePlugin({ server: true })],
    externals: [nodeExternals()]
}

export default config
