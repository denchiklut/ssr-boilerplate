import winston from 'winston'

import * as format from './formatters'

export const levels = { log: 'notice', debug: 'debug', info: 'info', warn: 'warn', error: 'error' }
winston.addColors({ notice: 'green', debug: 'magenta', info: 'blue', error: 'red', warn: 'yellow' })

export const logger = winston.createLogger({
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		...[
			format.error(),
			winston.format.splat(),
			IS_DEV && winston.format.colorize({ all: true }),
			IS_DEV && winston.format.simple(),
			IS_PROD && winston.format.json(),
			IS_PROD && format.metadata()
		].filter(Boolean)
	),
	levels: { error: 0, warn: 1, info: 2, notice: 3, debug: 4 },
	level: process.env.LOG_LEVEL || 'debug'
})
