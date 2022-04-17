import { join } from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/plugin-options'
import { IS_DEV, ROOT_DIR } from '../env'


const config = {
    async: IS_DEV,
    typescript: {
        configFile: join(ROOT_DIR, 'tsconfig.json')
    }
} as ForkTsCheckerWebpackPluginOptions

export const forkTsCheckerWebpackPlugin = new ForkTsCheckerWebpackPlugin(config)
