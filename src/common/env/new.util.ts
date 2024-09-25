import type { TypeOf, ZodObject, ZodRawShape } from 'zod'

interface Props<T extends ZodRawShape> {
	schema: ZodObject<T>
	envs: Record<keyof TypeOf<ZodObject<T>>, unknown>
	clientPrefix?: string
}
export function createEnv<S extends ZodRawShape>({
	schema,
	envs,
	clientPrefix = 'NEXT_PUBLIC_'
}: Props<S>) {
	const isServer = typeof window === 'undefined'

	const client = schema.pick(
		Object.keys(schema.shape)
			.filter(k => k.startsWith(clientPrefix))
			.reduce((res, key) => {
				// @ts-ignore
				res[key] = true
				return res
			}, {})
	)

	const { success, data, error } = (isServer ? schema : client).safeParse(envs)

	if (!success) {
		console.error('❌ Invalid environment variables:', error.flatten().fieldErrors)

		throw new Error('Invalid environment variables')
	}

	return new Proxy(data, {
		get(target, prop) {
			if (typeof prop !== 'string') {
				return undefined
			}

			if (!isServer && (!clientPrefix || !prop.startsWith(clientPrefix))) {
				throw new Error(
					`❌ Attempted to access a server-side environment variable ${prop} on the client`
				)
			}

			return Reflect.get(target, prop)
		}
	}) as TypeOf<ZodObject<S>>
}
