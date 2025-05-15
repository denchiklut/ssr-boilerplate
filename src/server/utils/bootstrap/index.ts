import http from 'http'
import https from 'https'
import type { Express } from 'express'
import { existsSync, readFileSync } from 'fs'
import { getENV, joinPath, logger } from 'src/common'

const sslKeyPath = 'certs/key.pem'
const sslCertPath = 'certs/cert.pem'
const sslIsExist = existsSync(sslKeyPath) && existsSync(sslCertPath)

export const bootstrap = (server: Express) => {
	const { port, host, pathname } = getENV('CLIENT_HOST')
	const protocol = sslIsExist ? 'https' : 'http'
	const url = joinPath(`${protocol}://${host}`, pathname)
	const message = `Application is started on 🌎 ${url}`
	const resolvedPort = port || 3000

	if (sslIsExist) {
		const key = readFileSync(sslKeyPath)
		const cert = readFileSync(sslCertPath)

		https.createServer({ key, cert }, server).listen(resolvedPort, () => logger.info(message))
	} else {
		http.createServer(server).listen(resolvedPort, () => logger.info(message))
	}
}
