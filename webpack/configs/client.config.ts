import * as rules from '../rules'
import * as plugins from '../plugins'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../env'

const config = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    context: ROOT_DIR,
    entry: [IS_DEV && 'webpack-hot-middleware/client', './src/client'].filter(Boolean),
    output: {
        path: DIST_DIR,
        filename: IS_DEV ? '[name].client.js' : '[name].[contenthash].client.js',
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
        plugins.definePlugin()
    ].filter(Boolean)
}

export default config
