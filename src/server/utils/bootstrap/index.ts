import { existsSync, readFileSync } from 'node:fs'
import http from 'node:http'
import https from 'node:https'
import type { Express } from 'express'

import { getENV, joinPath, logger } from '@/common'

const sslKeyPath = 'certs/key.pem'
const sslCertPath = 'certs/cert.pem'
const sslIsExist = existsSync(sslKeyPath) && existsSync(sslCertPath)

export const bootstrap = (server: Express) => {
	const { port, host, pathname } = new URL(getENV('CLIENT_HOST'))
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
