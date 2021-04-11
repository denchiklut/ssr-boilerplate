import * as Sentry from '@sentry/react'
import { configureStore, getDefaultMiddleware, DeepPartial } from '@reduxjs/toolkit'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory, createMemoryHistory } from 'history'
import createRootReducer, { RootState } from './rootReducer'
import { logger } from 'utils/logger.util'

export function createSore(preloadedState?: DeepPartial<RootState>, url = '/') {
    const history = IS_SERVER ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory()
    const sentryReduxEnhancer = Sentry.createReduxEnhancer()
    const store = configureStore({
        reducer: createRootReducer(history),
        devTools: IS_DEV,
        preloadedState,
        middleware: [routerMiddleware(history), ...getDefaultMiddleware(), logger],
        enhancers: [sentryReduxEnhancer]
    })

    if (IS_DEV && module.hot) {
        module.hot.accept('./rootReducer', () => {
            const newRootReducer = require('./rootReducer').default
            store.replaceReducer(newRootReducer)
        })
    }

    return { store, history }
}
