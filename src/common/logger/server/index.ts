import type { ILogger } from '../types'
import { winstonLogger } from './winston'

export class ServerLogger implements ILogger {
	private logger = winstonLogger

	log(...args: [string, unknown]) {
		this.logger.log('lоg', ...args)
	}

	debug(...args: [string, unknown]) {
		this.logger.debug(...args)
	}

	info(...args: [string, unknown]) {
		this.logger.info(...args)
	}

	warn(...args: [string, unknown]) {
		this.logger.warn(...args)
	}

	error(...args: [string, unknown]) {
		this.logger.error(...args)
	}
}
