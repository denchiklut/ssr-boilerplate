export function getOrDefault<T extends {}>(source: T) {
	function get(variable?: never, initial?: never): T
	function get<K extends keyof T>(variable: K, initial?: never): T[K]
	function get<K extends keyof T>(variable: K, initial: NonNullable<T[K]>): NonNullable<T[K]>
	function get<K extends keyof T>(variable: K, initial: T[K]): T[K] | T {
		if (!variable) return source
		return source[variable] ?? initial
	}

	return get
}
