import { join } from 'path'
import CopyPlugin from 'copy-webpack-plugin'
import { IS_PROD, ROOT_DIR } from '../utils'

export const copyPlugin =
	IS_PROD &&
	new CopyPlugin({
		patterns: [
			{
				from: join(ROOT_DIR, 'public'),
				filter(path) {
					const ignore = [
						join(ROOT_DIR, 'public/offline/index.html'),
						join(ROOT_DIR, 'public/spa/index.html')
					]
					return !ignore.some(v => path.startsWith(v))
				}
			}
		]
	})
