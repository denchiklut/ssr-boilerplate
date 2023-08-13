import type { Router } from 'express'

import { basePath } from 'src/common'
import { version } from '../controller'

export const versionRoutes = (router: Router) => {
	router.get(basePath('/version'), version)
}
