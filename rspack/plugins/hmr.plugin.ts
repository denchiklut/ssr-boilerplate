import { HotModuleReplacementPlugin } from '@rspack/core'

import { IS_DEV } from '../env'

export const hmr = IS_DEV && new HotModuleReplacementPlugin()
