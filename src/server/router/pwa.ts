import { type Router, static as staticRoute } from 'express'
import { resolve } from 'path'

import { basename, basePath } from 'src/common'
import { getManifest } from '../controller'
import { pwa } from '../middleware'

export const pwaRoutes = (router: Router) => {
	if (IS_DEV) return

	router.get(basePath('/manifest.json'), getManifest)
	router.use(basename, pwa, staticRoute(resolve(__dirname, '../client/pwa'), { redirect: false }))
}
