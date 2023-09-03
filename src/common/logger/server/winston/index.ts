import winston from 'winston'

winston.addColors({
	lоg: 'green',
	debug: 'magenta',
	info: 'blue',
	error: 'red',
	warn: 'yellow'
})

export const winstonLogger = winston.createLogger({
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		...[
			winston.format.splat(),
			IS_DEV && winston.format.colorize({ all: true }),
			IS_DEV && winston.format.simple(),
			IS_PROD && winston.format.json()
		].filter(Boolean)
	),
	levels: {
		error: 0,
		debug: 1,
		warn: 2,
		info: 3,
		lоg: 4
	},
	level: 'lоg'
})
