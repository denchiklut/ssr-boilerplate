import type { ILogger } from '../types'
import { getSrc } from './utils'
import { winstonLogger } from './winston'

export class ServerLogger implements ILogger {
	private logger = winstonLogger

	log(...args: [string, unknown]) {
		this.logger.notice(...args, this.src(this.log))
	}

	debug(...args: [string, unknown]) {
		this.logger.debug(...args, this.src(this.debug))
	}

	info(...args: [string, unknown]) {
		this.logger.info(...args, this.src(this.info))
	}

	warn(...args: [string, unknown]) {
		this.logger.warn(...args, this.src(this.warn))
	}

	error(...args: [string, unknown]) {
		this.logger.error(...args, this.src(this.error))
	}

	private src(caller: (...args: never[]) => unknown) {
		if (IS_PROD) return getSrc(caller)
	}
}
