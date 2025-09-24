import type { Router } from 'express'

import { renderServerComponent, getAvailableServerComponents } from '../controller'

export const rscRoutes = (router: Router) => {
	// API endpoint to render server components
	router.post('/api/rsc/render', renderServerComponent)
	
	// API endpoint to get available server components
	router.get('/api/rsc/components', getAvailableServerComponents)
}