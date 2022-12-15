import { DIST_DIR } from '../env'

const defaultPort = 5000
const devServerHost = 'localhost'
export const devServerUrl = `http://${devServerHost}:${defaultPort}/`

/**
 * @see https://webpack.js.org/configuration/dev-server/
 */
export const devServerConfig = {
	port: defaultPort,
	host: devServerHost,
	historyApiFallback: true,
	static: {
		directory: DIST_DIR
	}
}
