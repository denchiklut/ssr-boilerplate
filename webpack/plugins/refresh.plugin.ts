import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { IS_DEV } from '../env'

export const refreshPlugin = IS_DEV && new ReactRefreshWebpackPlugin()
