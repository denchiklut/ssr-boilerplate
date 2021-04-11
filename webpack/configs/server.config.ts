import { join } from 'path'
import nodeExternals from 'webpack-node-externals'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { rootDir } from '../utils/env'
import { alias } from '../utils/alias'

const config = {
    name: 'server',
    target: 'node',
    devtool: false,
    node: { __dirname: false },
    entry: join(rootDir, 'src', 'server', 'index.ts'),
    output: {
        filename: 'js/[name].server.js',
        libraryTarget: 'commonjs2',
        path: join(rootDir, 'dist')
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
    plugins: [plugins.miniCssExtractPlugin, plugins.environmentPlugin, plugins.definePlugin({ server: true })],
    externals: [nodeExternals()]
}

export default config
