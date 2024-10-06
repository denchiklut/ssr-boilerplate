import type { ErrorRequestHandler } from 'express'
import { logger } from 'src/common'

export const error: ErrorRequestHandler = (error, _, res, __) => {
	logger.error(`Error occurred on the server: ${error instanceof Error ? error.message : error}`)
	res.status(500).send('Internal server error')
}
