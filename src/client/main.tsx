import React from 'react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from '@shared/app'

const container = document.getElementById('root') as HTMLElement

if (IS_SPA)
    createRoot(container).render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    )
else {
    hydrateRoot(
        container,
        <MemoryRouter>
            <App />
        </MemoryRouter>
    )
}
