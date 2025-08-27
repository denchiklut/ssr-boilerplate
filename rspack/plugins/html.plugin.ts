import { join } from 'node:path'
import { HtmlRspackPlugin } from '@rspack/core'
import { IS_PROD, PUBLIC_PATH, ROOT_DIR } from '../env'

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
export const htmlWebpackPlugin = ({ spa = false }: Props = {}) => {
	return [
		IS_PROD && new HtmlRspackPlugin(offlineConfig),
		spa && new HtmlRspackPlugin(spaConfig)
	].filter(Boolean)
}
