import express from 'express'
import { favicon, hmr, render, logger, error, uuid } from 'server/middleware'
import { bootstrap } from 'server/utils'
import { router } from 'server/router'

export const app = express()
	.use(favicon())
	.use(uuid)
	.use(logger)
	.use(hmr())
	.use(render)
	.use(router)
	.use(error)

bootstrap(app)
