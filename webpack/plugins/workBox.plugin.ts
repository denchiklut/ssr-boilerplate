import { join } from 'path'
import { InjectManifest } from 'workbox-webpack-plugin'
import { IS_PROD, ROOT_DIR } from '../utils'

const wb = new InjectManifest({
	swDest: 'pwa/service-worker.js',
	swSrc: join(ROOT_DIR, 'pwa/sw.ts')
})

export const workboxBoxPlugin = IS_PROD && wb
