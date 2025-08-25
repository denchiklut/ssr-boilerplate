import { join } from 'path'
import { HtmlRspackPlugin } from '@rspack/core'
import { ROOT_DIR, IS_PROD, PUBLIC_PATH } from '../utils'

const offlineConfig = {
	filename: 'pwa/offline.html',
	inject: true,
	template: join(ROOT_DIR, 'public/offline/index.html'),
	publicPath: PUBLIC_PATH
}

const spaConfig = {
	filename: 'index.html',
	inject: true,
	template: join(ROOT_DIR, 'public/spa/index.html'),
	publicPath: PUBLIC_PATH
}

interface Props {
	spa?: boolean
}
export const htmlWebpackPlugin = ({ spa = false }: Props = {}) => [
		IS_PROD && new HtmlRspackPlugin(offlineConfig),
		spa && new HtmlRspackPlugin(spaConfig)
].filter(Boolean)
