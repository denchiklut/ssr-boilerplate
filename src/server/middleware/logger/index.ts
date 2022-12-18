import morgan, { type StreamOptions } from 'morgan'
import { logger as winstonLogger } from 'server/utils'

const stream: StreamOptions = {
	write: message => winstonLogger.info(message)
}

export const logger = morgan(':method :url :status - :response-time ms', { stream })
