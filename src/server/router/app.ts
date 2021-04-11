import { Router } from 'express'

import { renderApp } from 'server/controller'
import { render } from 'server/middleware'
import routes from 'client/routes'

const allRoutes = Object.values(routes)
    .map(({ path }) => path)
    .filter(i => i !== '*')

export function appRoutes(router: Router) {
    router.get([...allRoutes, '/__webpack_hmr'], [render], renderApp)
}
