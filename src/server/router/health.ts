import { Router } from 'express'
import { healthcheck } from '../controller'

export const healthRoutes = (router: Router) => {
	router.get('/health', healthcheck)
}
