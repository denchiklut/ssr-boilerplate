type Collection<K extends string | number, V> = Record<K, V>

interface Window {
	IS_SERVER: boolean
	IS_DEV: boolean
}

declare namespace Express {
	interface Response {
		renderApp(): void
	}
}
