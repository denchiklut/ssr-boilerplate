import { z, type TypeOf } from 'zod'
import { getOrDefault } from './get.util'
import { createEnv } from './env.util'

if (IS_SERVER) require('dotenv/config')

const envSchema = z.object({
	CLIENT_HOST: z.string().url().default('http://localhost:3000'),
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
		.filter(([k]) => k.startsWith(clientPrefix))
		.reduce<Collection<string, unknown>>((res, [k, v]) => {
			res[k] = v
			return res
		}, {})

	return `window.env_vars = Object.freeze(${JSON.stringify(clientEnv)})`
}
