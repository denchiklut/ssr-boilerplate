import { join } from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import { IS_PROD, ROOT_DIR } from '../utils'

const config = {
	patterns: [
		{ from: join(ROOT_DIR, 'assets/icons'), to: 'icons' },
		{ from: join(ROOT_DIR, 'pwa/manifest.json'), to: 'pwa' }
	]
}

export const copyPlugin = IS_PROD && new CopyPlugin(config)
