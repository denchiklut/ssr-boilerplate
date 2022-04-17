import { Router } from 'express'
import { appRoutes } from './app'

export const router = Router()
appRoutes(router)
