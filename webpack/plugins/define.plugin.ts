import 'dotenv/config'
import { DefinePlugin } from 'webpack'
import { IS_DEV, IS_PROD } from '../utils'

interface Props {
	server?: boolean
	spa?: boolean
}

const config = (IS_SERVER: boolean, IS_SPA: boolean) => ({
	IS_SERVER,
	IS_DEV,
	IS_PROD,
	IS_SPA,
	clientPrefix: JSON.stringify('CLIENT_'),
	...(!IS_SERVER && {
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

export const definePlugin = ({ server = false, spa = false }: Props = {}) =>
	new DefinePlugin(config(server, spa))
