import { resolve } from 'path'
import { Router, static as staticRoute } from 'express'
import { pwa } from 'server/middleware'
import { basename } from 'src/common'

export function staticRoutes(router: Router) {
	const distClient = resolve(__dirname, '../client')
	router.use(staticRoute(IS_DEV ? 'assets' : distClient))

	if (IS_PROD) {
		router.use(basename, pwa, staticRoute(resolve(distClient, 'pwa'), { redirect: false }))
	}
}
