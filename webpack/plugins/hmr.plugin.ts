import { HotModuleReplacementPlugin } from 'webpack'
import { IS_DEV } from '../utils'

export const hmr = IS_DEV && new HotModuleReplacementPlugin()
