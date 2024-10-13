import type Cookies from "universal-cookie"

declare global {
	namespace Express {
		interface Request {
			nonce: string
			universalCookies: Cookies
		}

		interface Response {
			renderApp(): void
		}
	}

	interface Window {
		nonce: string
	}
}
