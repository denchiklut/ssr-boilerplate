import { join } from 'path'
import nodeExternals from 'webpack-node-externals'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { SRC_DIR, DIST_DIR, ROOT_DIR } from '../env'

const config = {
    name: 'server',
    target: 'node',
    devtool: 'source-map',
    entry: join(SRC_DIR, 'server'),
    context: ROOT_DIR,
    output: {
        filename: 'js/server/[name].js',
        libraryTarget: 'commonjs2',
        path: DIST_DIR,
        publicPath: '/'
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
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
        plugins: [plugins.tsPaths]
    },
    plugins: [plugins.miniCssExtractPlugin, plugins.environmentPlugin, plugins.definePlugin({ server: true })],
    externals: [nodeExternals()]
}

export default config
