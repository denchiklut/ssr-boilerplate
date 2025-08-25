import type Cookies from "universal-cookie"

declare global {
	interface Window {
		nonce: string
	}

	namespace Express {
		interface Response {
			renderApp(): void
		}

		interface Request {
			nonce: string
			universalCookies: Cookies
		}
	}
}
