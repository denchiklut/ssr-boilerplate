import morgan from 'morgan'
import { logger as winstonLogger } from '@/common/logger'

export const logger = morgan(':method :url :status - :response-time ms', {
	skip: () => IS_DEV,
	stream: {
		write: message => winstonLogger.info(message)
	}
})
