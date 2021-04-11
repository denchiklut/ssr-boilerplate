import { join } from 'path'
import { InjectManifest } from 'workbox-webpack-plugin'

import { isProd, rootDir } from '../utils/env'

const wb = new InjectManifest({
    swDest: 'service-worker.js',
    swSrc: join(rootDir, 'pwa/sw.js')
})

export const workboxBoxPlugin = isProd && wb
