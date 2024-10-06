type Collection<K extends string | number, V> = Record<K, V>
type Falsy = false | 0 | '' | null | undefined;

interface Array<T> {
	filter<S extends T>(predicate: BooleanConstructor, thisArg?: unknown): Exclude<S, Falsy>[]
}
