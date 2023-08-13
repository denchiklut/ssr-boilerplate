import http from 'http'
import https from 'https'
import type { Express } from 'express'
import { existsSync, readFileSync } from 'fs'

import { basename, getENV, joinPath } from 'src/common'
import { logger } from 'server/utils'

const sslKeyPath = 'certs/key.pem'
const sslCertPath = 'certs/cert.pem'
const sslIsExist = existsSync(sslKeyPath) && existsSync(sslCertPath)

export const bootstrap = (server: Express) => {
	const { port, host } = new URL(getENV('HOST'))
	const protocol = sslIsExist ? 'https' : 'http'
	const url = joinPath(`${protocol}://${host}`, basename)
	const message = `Application is started on 🌎 ${url}`

	if (sslIsExist) {
		https
			.createServer(
				{ key: readFileSync(sslKeyPath), cert: readFileSync(sslCertPath) },
				server
			)
			.listen(port, () => logger.info(message))
	} else {
		http.createServer(server).listen(port, () => logger.info(message))
	}
}
