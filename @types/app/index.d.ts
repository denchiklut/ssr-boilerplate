import 'express'
import { ServerResponse } from 'webpack-dev-middleware'


declare global {
	interface Window {
		IS_SERVER: boolean
		IS_DEV: boolean
	}
}

declare module 'express' {
	export interface Response {
		locals: {
			nonce: string
			webpack: {
				devMiddleware: import('webpack-dev-middleware').Context<
					import('http').IncomingMessage,
					ServerResponse
					>
			}
		}

		renderApp(): void
	}
}

declare module 'express-serve-static-core' {
	export interface Response {
		renderApp(): void
	}
}
