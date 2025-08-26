import ReactRefresh from '@rspack/plugin-react-refresh'
import { IS_DEV } from '../utils'

export const refresh = IS_DEV && new ReactRefresh()
