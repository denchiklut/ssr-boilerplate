import express from 'express'
import { hot } from 'server/middleware'
import { router } from 'server/router'

export const app = express()
app.use(hot())
app.use(router)

app.listen(5000, () => {
	console.log('Application is started on localhost:5000')
})
