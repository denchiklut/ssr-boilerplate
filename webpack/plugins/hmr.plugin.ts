import { HotModuleReplacementPlugin } from 'webpack'
import { IS_DEV } from '../env'

export const hmr = IS_DEV && new HotModuleReplacementPlugin()
