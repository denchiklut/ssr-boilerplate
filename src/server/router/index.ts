import { Router } from 'express'
import { appRoutes } from './app'
import { staticRoutes } from './static'
import { healthRoutes } from './health'

export const router = Router()
staticRoutes(router)
healthRoutes(router)
appRoutes(router)
