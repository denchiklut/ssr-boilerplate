import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { IS_PROD, SRC_DIR } from '../env'


const offlineConfig = {
    filename: 'offline.html',
    inject: true,
    template: join(SRC_DIR, 'client/assets/offline/index.html')
}

const spaConfig = {
    filename: 'index.html',
    inject: true,
    template: join(SRC_DIR, 'client/assets/index.html')
}

interface Props {
    spa?: boolean
}

export const htmlWebpackPlugin = ({ spa = false }: Props = {}) =>
    [IS_PROD && new HtmlWebpackPlugin(offlineConfig), spa && new HtmlWebpackPlugin(spaConfig)].filter(Boolean)
