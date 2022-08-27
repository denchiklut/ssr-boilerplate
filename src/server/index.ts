import express from 'express'
import { favicon, hot } from 'server/middleware'
import { router } from 'server/router'

export const app = express()
app.use(favicon())
app.use(hot())
app.use(router)

app.listen(5000, () => {
	console.log('Application is started on http://localhost:5000')
})
