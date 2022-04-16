import { join } from 'path'
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { rootDir } from '../utils/env'
import { alias } from '../utils/alias'
import { devServerConfig, devServerUrl } from '../utils/devServer'

const config = {
    name: 'spa',
    target: 'web',
    devtool: 'source-map',
    entry: [join(rootDir, 'src', 'client', 'main.tsx')],
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
            rules.sassRule,
            rules.cssRule,
            ...rules.svgRules
        ]
    },
    devServer: devServerConfig,
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
        plugins.forkTsCheckerWebpackPlugin,
        plugins.environmentPlugin,
        new NodePolyfillPlugin(),
        plugins.definePlugin({ spa: true }),
        ...plugins.htmlWebpackPlugin({ spa: true })
    ].filter(Boolean)
}

export default config
