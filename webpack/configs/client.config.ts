import { join } from 'path'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { SRC_DIR, DIST_DIR, IS_DEV } from '../env'

const config = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    entry: [IS_DEV && 'webpack-hot-middleware/client', join(SRC_DIR, 'client')].filter(Boolean),
    output: {
        path: DIST_DIR,
        filename: 'js/client/[name].js',
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
    plugins: [
        plugins.loadablePlugin,
        plugins.miniCssExtractPlugin,
        plugins.refreshPlugin,
        plugins.hmr,
        plugins.definePlugin(),
        ...plugins.htmlWebpackPlugin()
    ].filter(Boolean)
}

export default config
