import express from 'express'
import { logger } from '../common/logger'

export const app = express().get('/', (_, res) => {
	res.send('Hello World!!!!')
}).listen(3000, () => {
	logger.log('Server is running on http://localhost:3000')
})