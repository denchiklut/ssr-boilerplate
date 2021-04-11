import { join } from 'path'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { rootDir, isDev, isProd } from '../utils/env'
import { alias } from '../utils/alias'
import { optimization } from '../utils/optimization'

const config = {
    name: 'client',
    target: 'web',
    devtool: isProd ? false : 'inline-source-map',
    entry: [
        isDev && 'react-hot-loader/patch',
        isDev && 'css-hot-loader/hotModuleReplacement',
        isDev && 'webpack-hot-middleware/client',
        join(rootDir, 'src', 'client', 'main.tsx')
    ].filter(Boolean),
    output: {
        path: join(rootDir, 'dist'),
        filename: 'js/[name].[contenthash].client.js',
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
        plugins.miniCssExtractPlugin,
        plugins.loadablePlugin,
        plugins.esLintPlugin,
        plugins.copyPlugin,
        plugins.workboxBoxPlugin,
        plugins.hmr,
        plugins.forkTsCheckerWebpackPlugin,
        plugins.environmentPlugin,
        plugins.lodashPlugin,
        plugins.circularDependency,
        plugins.definePlugin(),
        ...plugins.htmlWebpackPlugin(),
    ].filter(Boolean),
    optimization
}

export default config
