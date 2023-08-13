import { Router } from 'express'
import { appRoutes } from './app'
import { staticRoutes } from './static'
import { versionRoutes } from './version'
import { healthRoutes } from './health'

export const router = Router()
staticRoutes(router)
versionRoutes(router)
healthRoutes(router)
appRoutes(router)
