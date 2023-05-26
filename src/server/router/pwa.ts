import { Router } from 'express'
import { pwa } from '../controller'

export const pwaRoutes = (router: Router) => {
	router.get('/service-worker.*', pwa)
}
