import type { Router } from 'express'

import { basePath } from '@/common/path'

import { version } from '../controller'

export const versionRoutes = (router: Router) => {
	router.get(basePath('/version'), version)
}
