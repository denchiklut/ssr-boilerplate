type Collection<K extends string | number, V> = Record<K, V>

interface Array<T> {
	filter<S extends T>(predicate: BooleanConstructor, thisArg?: unknown): Exclude<S, Falsy>[]
}

/**
 *  webpack-hot-middleware have
 *  a hardcoded devDependency of webpack
 */
declare module 'webpack-hot-middleware' {
	export default function hotMiddleware(compiler: import('webpack').Compiler|import('webpack').MultiCompiler): void
}
