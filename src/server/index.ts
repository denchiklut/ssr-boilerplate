import express from 'express'
import { favicon, hmr, logger, cookieParser, nonce, error } from 'server/middleware'
import { bootstrap } from 'server/utils'
import { router } from 'server/router'

export const expressApp = express()
	.use(cookieParser)
	.use(favicon())
	.use(hmr())
	.use(logger)
	.use(nonce)
	.use(router)
	.use(error)

bootstrap(expressApp)
