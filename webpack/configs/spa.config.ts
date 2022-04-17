import { join } from 'path'
import { devServerConfig } from '../utils/devServer'
import * as plugins from '../plugins'
import * as rules from '../rules'
import { SRC_DIR } from '../env'

const config = {
    name: 'spa',
    target: 'web',
    devtool: 'source-map',
    entry: join(SRC_DIR, 'client'),
    output: {
        path: join(__dirname, '../dist'),
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
        plugins.definePlugin({ spa: true }),
        ...plugins.htmlWebpackPlugin({ spa: true })
    ].filter(Boolean)
}

export default config
