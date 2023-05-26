import { Router } from 'express'
import { appRoutes } from './app'
import { staticRoutes } from './static'
import { healthRoutes } from './health'
import { pwaRoutes } from './pwa'

export const router = Router()
staticRoutes(router)
healthRoutes(router)
pwaRoutes(router)
appRoutes(router)
