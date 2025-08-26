import type { Router } from 'express'
import { render } from '../controller'

export function appRoutes(router: Router) {
	router.get(/.*/, render)
}
