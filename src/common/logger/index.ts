import { ClientLogger } from './client'
import type { ILogger } from './types'

class Logger implements ILogger {
	private logger: ILogger

	constructor() {
		if (IS_SERVER) {
			const { ServerLogger } = require('./server')
			this.logger = new ServerLogger() as ILogger
		} else {
			this.logger = new ClientLogger() as ILogger
		}
	}

	log(...args: unknown[]) {
		this.logger.log(...args)
	}

	debug(...args: unknown[]) {
		this.logger.debug(...args)
	}

	info(...args: unknown[]) {
		this.logger.info(...args)
	}

	warn(...args: unknown[]) {
		this.logger.warn(...args)
	}

	error(...args: unknown[]) {
		this.logger.error(...args)
	}
}

export const logger = new Logger()
