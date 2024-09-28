import type { ObjectSchema, InferType, AnyObject, AnySchema } from 'yup'
import { parse } from 'src/common/env/parse.util'

interface Props<T extends AnyObject> {
	schema: ObjectSchema<T>
	envs: Partial<Record<keyof InferType<ObjectSchema<T>>, unknown>>
	clientPrefix?: string
}
export function createEnv<S extends AnyObject>({
	schema,
	envs,
	clientPrefix = 'CLIENT_'
}: Props<S>) {
	const client = schema.pick(Object.keys(schema.shape).filter(k => k.startsWith(clientPrefix)))
	const { data, error } = parse((IS_SERVER ? schema : client) as AnySchema<S>, envs)

	if (error) {
		console.error('❌ Invalid environment variables:', error.errors)

		throw new Error('Invalid environment variables')
	}

	return new Proxy(data, {
		get(target, prop, receiver) {
			if (typeof prop !== 'string') {
				return undefined
			}

			if (
				!IS_SERVER &&
				(!clientPrefix || !prop.startsWith(clientPrefix)) &&
				!['toJSON', 'toString'].includes(prop)
			) {
				throw new Error(
					`❌ Attempted to access a server-side environment variable "${prop}" on the client`
				)
			}

			return Reflect.get(target, prop, receiver)
		}
	}) as InferType<ObjectSchema<S>>
}
