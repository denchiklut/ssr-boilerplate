namespace Express {
	interface Request {
		nonce: string
	}

	interface Response {
		renderApp(): void
	}
}
