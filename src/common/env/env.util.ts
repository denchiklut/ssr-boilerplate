import type { TypeOf, ZodObject, ZodRawShape } from 'zod'

interface Props<T extends ZodRawShape> {
	schema: ZodObject<T>
	envs: Partial<Record<keyof TypeOf<ZodObject<T>>, unknown>>
	clientPrefix?: string
}
export function createEnv<S extends ZodRawShape>({
	schema,
	envs,
	clientPrefix = 'CLIENT_'
}: Props<S>) {
	const client = schema.pick(
		Object.keys(schema.shape)
			.filter(k => k.startsWith(clientPrefix))
			.reduce((acc, key) => {
				const res = acc as Collection<string, boolean>
				res[key] = true

				return res
			}, {})
	)

	const { success, data, error } = (IS_SERVER || IS_SPA ? schema : client).safeParse(envs)

	if (!success) {
		console.error('❌ Invalid environment variables:', error.flatten().fieldErrors)
		throw new Error('Invalid environment variables')
	}

	return new Proxy(data, {
		get(target, prop, receiver) {
			if (typeof prop !== 'string') return undefined

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
	}) as TypeOf<ZodObject<S>>
}
