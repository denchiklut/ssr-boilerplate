import express from 'express'
import { favicon, hot } from 'server/middleware'
import { router } from 'server/router'
import { bootstrap } from 'server/utils'

export const app = express()
app.use(favicon())
app.use(hot())
app.use(router)

bootstrap(app)
