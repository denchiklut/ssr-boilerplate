import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { isProd, rootDir } from '../utils/env'

const offlineConfig = {
    filename: 'offline.html',
    inject: true,
    template: join(rootDir, 'src/client/assets/offline/index.html')
}

const spaConfig = {
    filename: 'index.html',
    inject: true,
    template: join(rootDir, 'src/client/assets/index.html')
}

interface Props {
    spa?: boolean
}

export const htmlWebpackPlugin = ({ spa = false }: Props = {}) =>
    [isProd && new HtmlWebpackPlugin(offlineConfig), spa && new HtmlWebpackPlugin(spaConfig)].filter(Boolean)
