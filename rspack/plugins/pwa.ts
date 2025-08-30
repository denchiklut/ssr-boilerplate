import { join } from 'node:path'
import { InjectManifest } from '@aaroon/workbox-rspack-plugin'

import { IS_PROD, ROOT_DIR } from '../env'

const wb = new InjectManifest({
	swDest: 'pwa/service-worker.js',
	swSrc: join(ROOT_DIR, 'pwa/sw.ts')
})

export const pwa = IS_PROD && wb
