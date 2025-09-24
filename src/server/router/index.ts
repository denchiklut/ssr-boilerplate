import { Router } from 'express'

import { appRoutes } from './app'
import { healthRoutes } from './health'
import { pwaRoutes } from './pwa'
import { rscRoutes } from './rsc'
import { staticRoutes } from './static'
import { versionRoutes } from './version'

export const router = Router()
staticRoutes(router)
versionRoutes(router)
healthRoutes(router)
rscRoutes(router)
pwaRoutes(router)
appRoutes(router)
