import express from 'express'
import { favicon, hot, logger } from 'server/middleware'
import { router } from 'server/router'
import { bootstrap } from 'server/utils'

export const app = express()
app.use(favicon())
app.use(logger)
app.use(hot())
app.use(router)

bootstrap(app)
