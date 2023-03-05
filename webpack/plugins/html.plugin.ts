import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { ROOT_DIR, IS_PROD } from '../env'

const offlineConfig = {
	filename: 'offline.html',
	inject: true,
	template: join(ROOT_DIR, 'assets/offline/index.html')
}

const spaConfig = {
	filename: 'index.html',
	inject: true,
	template: join(ROOT_DIR, 'assets/spa/index.html')
}

interface Props {
	spa?: boolean
}
export const htmlWebpackPlugin = ({ spa = false }: Props = {}) =>
	spa ? new HtmlWebpackPlugin(spaConfig) : IS_PROD && new HtmlWebpackPlugin(offlineConfig)
