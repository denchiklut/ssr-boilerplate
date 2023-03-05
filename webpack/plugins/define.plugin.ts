import dotenv from 'dotenv'
import { DefinePlugin } from 'webpack'
import { IS_DEV, IS_PROD } from '../env'

interface Props {
	server?: boolean
	spa?: boolean
}

dotenv.config()
const config = (IS_SERVER: boolean, IS_SPA: boolean) => ({
	IS_SERVER,
	IS_DEV,
	IS_PROD,
	IS_SPA,
	'process.env': JSON.stringify(process.env)
})

export const definePlugin = ({ server = false, spa = false }: Props = {}) =>
	new DefinePlugin(config(server, spa))
