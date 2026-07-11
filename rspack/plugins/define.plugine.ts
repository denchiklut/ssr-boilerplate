import 'dotenv/config'
import { DefinePlugin } from '@rspack/core'

import { IS_DEV, IS_PROD } from '../env'

interface Props {
	server?: boolean
}
export const definePlugin = ({ server = false }: Props = {}) =>
	new DefinePlugin({
		IS_DEV,
		IS_PROD,
		IS_SERVER: server,
		clientPrefix: JSON.stringify('CLIENT_')
	})
