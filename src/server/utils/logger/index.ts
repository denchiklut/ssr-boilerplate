import winston from 'winston'

const format = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.colorize({ all: true }),
	winston.format.printf(info => `${info.timestamp}: ${info.message}`)
)
const transports = [new winston.transports.Console()]

export const logger = winston.createLogger({ format, transports })
