import { resolve } from 'path'
import { Router, static as staticRoute } from 'express'

export function staticRoutes(router: Router) {
	router.use(staticRoute(IS_DEV ? 'assets' : resolve(__dirname, '../client')))
}
