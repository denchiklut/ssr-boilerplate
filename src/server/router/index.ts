import { Router } from 'express'

import { appRoutes } from './app'
import { staticRoutes } from './static'

const router = Router()

staticRoutes(router)
appRoutes(router)

export { router }
