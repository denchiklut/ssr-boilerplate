import { Router } from 'express'
import type { Configuration } from 'webpack'
import { render } from '../controller/render'
import { hot } from '../middleware/hot'
import config from '../../../webpack/configs/client.config'

export function appRoutes(router: Router) {
    router.get('*', [...hot(config as Configuration)], render)
}
