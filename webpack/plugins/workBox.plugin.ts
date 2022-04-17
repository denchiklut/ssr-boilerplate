import { join } from 'path'
import { InjectManifest } from 'workbox-webpack-plugin'
import { IS_PROD, ROOT_DIR } from '../env'


const wb = new InjectManifest({
    swDest: 'service-worker.js',
    swSrc: join(ROOT_DIR, 'pwa/sw.js')
})

export const workboxBoxPlugin = IS_PROD && wb
