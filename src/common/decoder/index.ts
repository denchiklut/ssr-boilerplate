import type { AnySchema, InferType } from 'yup'

export const decode = <S extends AnySchema>(schema: S, data: Collection<string, unknown>) => {
	function getDecoder(variable?: never, initial?: never): InferType<S>
	function getDecoder<T extends keyof InferType<S>>(variable: T, initial?: never): InferType<S>[T]
	function getDecoder<T extends keyof InferType<S>>(
		variable: T,
		initial: NonNullable<InferType<S>[T]>
	): NonNullable<InferType<S>[T]>
	function getDecoder<T extends keyof InferType<S>>(
		variable: T,
		initial: InferType<S>[T]
	): InferType<S>[T] {
		const source = schema.validateSync(data)
		if (!variable) return source

		return source[variable] ?? initial
	}

	return getDecoder
}
