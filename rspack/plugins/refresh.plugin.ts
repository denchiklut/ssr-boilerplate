import ReactRefresh from '@rspack/plugin-react-refresh'

import { IS_DEV } from '../env'

export const refresh = IS_DEV && new ReactRefresh()
