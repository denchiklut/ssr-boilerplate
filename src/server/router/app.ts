import { Router } from 'express'
import { render } from '../controller/render'

export function appRoutes(router: Router) {
    router.get('*', render)
}
