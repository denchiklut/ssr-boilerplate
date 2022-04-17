import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { loadableReady } from '@loadable/component'
import { App } from '@shared/app'

loadableReady(() => {
    const container = document.getElementById('root') as HTMLElement
    const AppContainer = (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )

    if (IS_SPA) createRoot(container).render(AppContainer)
    else hydrateRoot(container, AppContainer)
})
