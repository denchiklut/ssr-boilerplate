import { join } from 'node:path'
import { CopyRspackPlugin } from '@rspack/core'
import { IS_PROD, ROOT_DIR } from '../env'

export const copy =
	IS_PROD &&
	new CopyRspackPlugin({
		patterns: [{ from: join(ROOT_DIR, 'public') }]
	})
