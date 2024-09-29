import { type AnyObject, type ObjectSchema, ValidationError } from 'yup'

type ParseResult<T> = { data: T; error: null } | { data: null; error: ValidationError }

export function parse<T extends AnyObject>(schema: ObjectSchema<T>, envs: unknown): ParseResult<T> {
	try {
		const data = schema.validateSync(envs, { abortEarly: false })
		return { data, error: null } as ParseResult<T>
	} catch (error) {
		if (error instanceof ValidationError) return { error, data: null }
		throw error
	}
}
