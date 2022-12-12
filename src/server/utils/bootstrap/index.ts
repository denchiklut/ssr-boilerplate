import https from 'https'
import type { Express } from 'express'
import { existsSync, readFileSync } from 'fs'
import { logger } from 'server/utils'

const sslKeyPath = 'certs/key.pem'
const sslCertPath = 'certs/cert.pem'
const sslIsExist = existsSync(sslKeyPath) && existsSync(sslCertPath)

export const bootstrap = (server: Express) => {
	const port = 5000
	const host = 'localhost'

	if (sslIsExist) {
		https
			.createServer(
				{ key: readFileSync(sslKeyPath), cert: readFileSync(sslCertPath) },
				server
			)
			.listen(port, () => {
				logger.info(`Application is started on https://${host}:${port}`)
			})
	} else {
		server.listen(port, () => {
			logger.info(`Application is started on http://${host}:${port}`)
		})
	}
}
