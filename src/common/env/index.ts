import { type TypeOf, z } from 'zod'
import { createEnv } from './env.util'
import { getOrDefault } from './get.util'

if (IS_SERVER) require('dotenv/config')

/**
 * you can find implementation for a `yup` library
 * in the `feat/pipable-stream` git branch
 */
const envSchema = z.object({
	CLIENT_HOST: z
		.string()
		.url()
		.default('http://localhost:3000')
		.transform(h => new URL(h)),
	CLIENT_PUBLIC_PATH: z.string().default('/'),
	APP_VERSION: z.string().default('0.0.0'),
	NODE_ENV: z.enum(['production', 'development', 'test']).default('development')
})

export type Env = TypeOf<typeof envSchema>

export const getENV = getOrDefault(
	createEnv({
		clientPrefix,
		schema: envSchema,
		envs: IS_SERVER || IS_SPA ? process.env : window.env_vars
	})
)

export const setEnvVars = () => {
	const clientEnv = Object.entries(getENV())
		.filter(([k]) => k.startsWith(clientPrefix) || k === 'NODE_ENV')
		.reduce<Collection<string, unknown>>((res, [k, v]) => {
			res[k] = v
			return res
		}, {})

	return `window.env_vars=Object.freeze(${JSON.stringify(clientEnv)})`
}
