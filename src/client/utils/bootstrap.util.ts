import type { ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

export const bootstrap = (app: ReactNode) => {
	const spaContainer = document.getElementById('root') as HTMLElement

	if (IS_SPA) createRoot(spaContainer).render(app)
	else hydrateRoot(document, app)
}
