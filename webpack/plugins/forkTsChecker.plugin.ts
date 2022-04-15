import { join } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/plugin-options'

import { isDev, rootDir } from '../utils/env'

const config = {
    async: isDev,
    typescript: {
        configFile: join(rootDir, 'tsconfig.json')
    }
} as ForkTsCheckerWebpackPluginOptions

export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(config)
