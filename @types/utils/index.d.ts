type Collection<K extends string | number, V> = Record<K, V>

interface Array<T> {
	filter<S extends T>(predicate: BooleanConstructor, thisArg?: unknown): Exclude<S, Falsy>[]
}
