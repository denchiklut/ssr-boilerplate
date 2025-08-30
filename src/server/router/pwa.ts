import { resolve } from 'node:path'
import { type Router, static as staticRoute } from 'express'

import { basename, basePath } from '@/common/path'
import { getManifest } from '../controller'
import { pwa } from '../middleware'

export const pwaRoutes = (router: Router) => {
	if (IS_DEV) return

	router.get(basePath('/manifest.json'), getManifest)
	router.use(basename, pwa, staticRoute(resolve(__dirname, '../client/pwa'), { redirect: false }))
}
