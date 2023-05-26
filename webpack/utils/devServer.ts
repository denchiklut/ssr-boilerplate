import { join } from 'path'
import { ROOT_DIR } from './env'

/**
 * @see https://webpack.js.org/configuration/dev-server/
 */
export const devServerConfig = {
	port: 3000,
	host: 'localhost',
	historyApiFallback: true,
	static: { directory: join(ROOT_DIR, 'assets') }
}
