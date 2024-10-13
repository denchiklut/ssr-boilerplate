import { join } from 'path'
import { existsSync, readFileSync } from 'fs'
import { ROOT_DIR } from '../env'
import { safeUrl } from './url'

const sslKeyPath = join(ROOT_DIR, 'certs/key.pem')
const sslCertPath = join(ROOT_DIR, 'certs/cert.pem')
const sslIsExist = existsSync(sslKeyPath) && existsSync(sslCertPath)

const { port, hostname } = safeUrl()

/**
 * @see https://webpack.js.org/configuration/dev-server/
 */
export const devServerConfig = {
	server: {
		type: sslIsExist ? 'https' : 'http',
		options: {
			...(sslIsExist && {
				key: readFileSync(sslKeyPath),
				cert: readFileSync(sslCertPath)
			})
		}
	},
	port,
	host: hostname,
	historyApiFallback: true,
	static: { directory: join(ROOT_DIR, 'assets') }
}
