import { join } from 'path'
import CopyPlugin from 'copy-webpack-plugin'

import { rootDir, isProd } from '../utils/env'

const config = {
    patterns: [
        { from: join(rootDir, 'src/client/assets/icons'), to: './icons' },
        { from: join(rootDir, 'pwa/manifest.json'), to: './' }
    ]
}

export const copyPlugin = isProd && new CopyPlugin(config)
