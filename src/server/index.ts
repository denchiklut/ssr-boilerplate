import express from 'express'
import { favicon, hmr, render, logger, error } from 'server/middleware'
import { bootstrap } from 'server/utils'
import { router } from 'server/router'

export const app = express()
	.use(favicon())
	.use(hmr())
	.use(logger)
	.use(render)
	.use(router)
	.use(error)

bootstrap(app)
