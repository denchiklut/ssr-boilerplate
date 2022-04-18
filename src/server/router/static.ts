import { Router, static as staticRout } from 'express'

export function staticRoutes(router: Router) {
    router.use(staticRout('dist'))
}
