import { ClientLogger } from './client'
import type { ILogger } from './types'

const getLogger = (): ILogger => {
	if (IS_SERVER) {
		const { ServerLogger } = require('./server')
		return new ServerLogger()
	} else {
		return new ClientLogger('app')
	}
}

export const logger = getLogger()
