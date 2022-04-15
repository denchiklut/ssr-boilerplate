import { Router } from 'express'

import { renderApp } from 'server/controller'
import { render } from 'server/middleware'

export function appRoutes(router: Router) {
    router.get(['/', '/about', '/__webpack_hmr'], [render], renderApp)
}
