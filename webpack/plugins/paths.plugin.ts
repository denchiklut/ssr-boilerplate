import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

export const tsPaths = new TsconfigPathsPlugin({ configFile: './tsconfig.json' })
