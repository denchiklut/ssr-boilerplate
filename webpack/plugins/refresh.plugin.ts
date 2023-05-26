import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { IS_DEV } from '../utils'

export const refreshPlugin = IS_DEV && new ReactRefreshWebpackPlugin()
