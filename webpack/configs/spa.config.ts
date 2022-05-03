import { devServerConfig } from '../utils/devServer'
import * as plugins from '../plugins'
import * as rules from '../rules'
import { DIST_DIR, ROOT_DIR } from '../env'

const config = {
    name: 'spa',
    target: 'web',
    devtool: 'source-map',
    mode: 'development',
    context: ROOT_DIR,
    entry: './src/client',
    output: {
        path: DIST_DIR,
        publicPath: '/',
        filename: 'js/[name].[fullhash].js'
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
    devServer: devServerConfig,
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
        plugins: [plugins.tsPaths]
    },
    plugins: [
        plugins.loadablePlugin,
        plugins.miniCssExtractPlugin,
        plugins.refreshPlugin,
        plugins.hmr,
        plugins.htmlWebpackPlugin,
        plugins.definePlugin({ spa: true })
    ].filter(Boolean)
}

export default config
