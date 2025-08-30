import express from 'express'

import { cookieParser, error, favicon, hmr, logger, nonce } from './middleware'
import { router } from './router'
import { bootstrap } from './utils'

export const expressApp = express()
	.use(cookieParser)
	.use(favicon())
	.use(hmr())
	.use(logger)
	.use(nonce)
	.use(router)
	.use(error)

bootstrap(expressApp)
