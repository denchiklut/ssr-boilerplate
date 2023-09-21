import { join } from 'path'
import { ROOT_DIR } from './env'
import { existsSync, readFileSync } from 'fs'

const sslKeyPath = join(ROOT_DIR, 'certs/key.pem')
const sslCertPath = join(ROOT_DIR, 'certs/cert.pem')
const sslIsExist = existsSync(sslKeyPath) && existsSync(sslCertPath)

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
	port: 3000,
	host: 'localhost',
	historyApiFallback: true,
	static: { directory: join(ROOT_DIR, 'assets') }
}
