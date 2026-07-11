import { ClientLogger } from './client'
import type { Logger } from './types'

const getLogger = (): Logger => {
	if (IS_SERVER) {
		const { ServerLogger } = require('./server')
		return new ServerLogger()
	} else {
		return new ClientLogger()
	}
}

export const logger = getLogger()
