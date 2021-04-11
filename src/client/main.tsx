import React from 'react'
import { hydrate, render as reactRender } from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { loadableReady } from '@loadable/component'

import App from '@shared/app'
import { registerSW } from 'utils/pwa.util'
import { setupSentry } from 'utils/sentry.util'
import { createSore } from 'client/store'

const { store, history } = createSore(window.__INITIAL_STATE__)
const render = IS_SPA ? reactRender : hydrate

loadableReady(() => {
    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    )
})

if (!IS_SERVER && !IS_DEV) {
    registerSW(store)
    setupSentry()
}
