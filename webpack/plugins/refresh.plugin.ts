import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { isDev } from '../utils/env'

export const refreshPlugin = isDev && new ReactRefreshWebpackPlugin()
