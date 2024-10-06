import 'dotenv/config'
import { DefinePlugin } from 'webpack'
import { IS_DEV, IS_PROD } from '../utils'

interface Props {
	server?: boolean
	spa?: boolean
}
export const definePlugin = ({ server = false, spa = false }: Props = {}) =>
	new DefinePlugin({
		IS_PROD,
		IS_DEV,
		IS_SPA: spa,
		IS_SERVER: server,
		clientPrefix: JSON.stringify('CLIENT_'),
		...(!server && {
			'process.env': JSON.stringify(
				Object.entries(process.env)
					.filter(([k]) => k.startsWith('CLIENT_'))
					.reduce<Collection<string, unknown>>((res, [k, v]) => {
						res[k] = v
						return res
					}, {})
			)
		})
	})
