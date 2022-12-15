interface Window {
	IS_SERVER: boolean
	IS_DEV: boolean
}

namespace Express {
	interface Response {
		renderApp(): Promise<void>
	}
}
