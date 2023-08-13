import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { ROOT_DIR, IS_PROD } from '../utils'

const offlineConfig = {
	filename: 'pwa/offline.html',
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
	[
		IS_PROD && new HtmlWebpackPlugin(offlineConfig),
		spa && new HtmlWebpackPlugin(spaConfig)
	].filter(Boolean)
