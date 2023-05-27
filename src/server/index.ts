import express from 'express'
import { favicon, hmr, render, logger } from 'server/middleware'
import { bootstrap } from 'server/utils'
import { router } from 'server/router'

export const app = express()
app.use(favicon())
app.use(hmr())
app.use(logger)
app.use(render)
app.use(router)

bootstrap(app)
