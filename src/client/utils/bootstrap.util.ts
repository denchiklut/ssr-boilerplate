import type { ReactNode } from 'react'
import { loadableReady } from '@loadable/component'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { registerSW } from 'utils/pwa.util'

export const bootstrap = (app: ReactNode) => {
	const container = document.getElementById('root') as HTMLElement

	if (IS_SPA) createRoot(container).render(app)
	else loadableReady(() => hydrateRoot(container, app))

	if (IS_PROD) registerSW()
}
