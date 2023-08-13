import type { ZodType, TypeOf } from 'zod'

export const decoder = <S extends ZodType>(
	schema: S,
	dataSource: Record<string, string | undefined>
) => {
	function getDecoder(variable?: never, initial?: never): TypeOf<S>
	function getDecoder<T extends keyof TypeOf<S>>(variable: T, initial?: never): TypeOf<S>[T]
	function getDecoder<T extends keyof TypeOf<S>>(
		variable: T,
		initial: NonNullable<TypeOf<S>[T]>
	): NonNullable<TypeOf<S>[T]>
	function getDecoder<T extends keyof TypeOf<S>>(
		variable: T,
		initial: TypeOf<S>[T]
	): TypeOf<S>[T] {
		const source = schema.parse(dataSource)
		if (!variable) return source

		return source[variable] ?? initial
	}

	return getDecoder
}
