import { Middleware } from 'redux'
import { getDebugger } from 'utils/debugger.util'

const debug = getDebugger('redux')
export const logger: Middleware = () => next => action => {
    debug('action %o', action)

    return next(action)
}
