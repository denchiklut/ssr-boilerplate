import { join } from 'path'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { rootDir, isDev } from '../utils/env'
import { alias } from '../utils/alias'

const config = {
    name: 'client',
    target: 'web',
    devtool: 'source-map',
    entry: [
        isDev && 'webpack-hot-middleware/client',
        isDev && 'css-hot-loader/hotModuleReplacement',
        join(rootDir, 'src', 'client', 'main.tsx')
    ].filter(Boolean),
    output: {
        path: join(rootDir, 'dist'),
        filename: 'js/client/[name].[contenthash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            rules.javascriptRule,
            rules.typescriptRule,
            rules.htmlRule,
            rules.mediasRule,
            rules.fontsRule,
            rules.sassRule,
            rules.cssRule,
            ...rules.svgRules
        ]
    },
    resolve: {
        alias,
        extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss']
    },
    plugins: [
        plugins.cleanPlugin,
        plugins.miniCssExtractPlugin,
        plugins.loadablePlugin,
        plugins.copyPlugin,
        plugins.workboxBoxPlugin,
        plugins.hmr,
        plugins.refreshPlugin,
        // plugins.forkTsCheckerWebpackPlugin,
        plugins.definePlugin(),
        ...plugins.htmlWebpackPlugin()
    ].filter(Boolean)
}

export default config
