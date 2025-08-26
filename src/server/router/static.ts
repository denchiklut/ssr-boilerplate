import { resolve } from 'node:path'
import { type Router, static as staticRoute } from 'express'

export function staticRoutes(router: Router) {
	router.use(staticRoute(IS_DEV ? 'public' : resolve(__dirname, '../client')))
}
