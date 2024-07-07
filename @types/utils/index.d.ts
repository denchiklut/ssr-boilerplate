type Collection<K extends string | number, V> = Record<K, V>
type Nullable<T> = T | null

interface Array<T> {
	filter<S extends T>(predicate: BooleanConstructor, thisArg?: unknown): Exclude<S, Falsy>[]
}

declare module 'babel-plugin-react-compiler'
