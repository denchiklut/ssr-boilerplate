import express from 'express'
import { favicon, hmr, render, logger, cookieParser, uuid, error } from 'server/middleware'
import { bootstrap } from 'server/utils'
import { router } from 'server/router'

export const app = express()
	.use(cookieParser)
	.use(favicon())
	.use(uuid)
	.use(logger)
	.use(hmr())
	.use(render)
	.use(router)
	.use(error)

bootstrap(app)
