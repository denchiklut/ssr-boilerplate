import { join } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions'

import { isDev, rootDir } from '../utils/env'

const config = {
    async: isDev,
    typescript: {
        configFile: join(rootDir, 'tsconfig.json')
    },
    eslint: { enabled: true, files: './src/**/*.{ts,tsx,js,jsx}' },
    logger: { infrastructure: 'silent', issues: 'console' }
} as ForkTsCheckerWebpackPluginOptions

export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(config)
