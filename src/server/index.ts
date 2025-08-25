import express from 'express'
import { favicon, hmr, logger, cookieParser, nonce, error } from './middleware'
import { bootstrap } from './utils'
import { router } from './router'

export const expressApp = express()
	.use(cookieParser)
	.use(favicon())
	.use(hmr())
	.use(logger)
	.use(nonce)
	.use(router)
	.use(error)

bootstrap(expressApp)
