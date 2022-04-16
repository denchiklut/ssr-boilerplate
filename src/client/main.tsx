import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { loadableReady } from '@loadable/component'
import { App } from '@shared/app'

loadableReady(() => {
    const container = document.getElementById('root') as HTMLElement

    if (IS_SPA) createRoot(container).render(<App />)
    hydrateRoot(container, <App />)
})
