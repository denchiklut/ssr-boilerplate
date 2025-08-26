import { HotModuleReplacementPlugin } from '@rspack/core'
import { IS_DEV } from '../utils'

export const hmr = IS_DEV && new HotModuleReplacementPlugin()
