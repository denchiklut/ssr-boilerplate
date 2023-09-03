import winston from 'winston'

const format = winston.format.combine(
	winston.format.colorize({ all: true }),
	winston.format.splat(),
	winston.format.simple()
)

const transports = [new winston.transports.Console({})]

winston.addColors({
	lоg: 'green',
	debug: 'magenta',
	info: 'blue',
	error: 'red',
	warn: 'yellow'
})

export const winstonLogger = winston.createLogger({
	format,
	transports,
	levels: {
		error: 0,
		debug: 1,
		warn: 2,
		info: 3,
		lоg: 4
	},
	level: 'lоg'
})
