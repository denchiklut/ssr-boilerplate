import type { DataRouter } from 'react-router'
import type Cookies from 'universal-cookie'

declare global {
	namespace Express {
		interface Request {
			nonce: string
			universalCookies: Cookies
		}

		interface Response {
			renderApp(): Promise<void>
		}
	}

	interface Window {
		nonce: string
		/** set by react-router's RSCHydratedRouter; used for the dev RSC refresh */
		__reactRouterDataRouter?: DataRouter
	}
}
