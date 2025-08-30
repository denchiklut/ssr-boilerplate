import { type InferType, mixed, object, string } from 'yup'

import { createEnv } from './env.util'
import { getOrDefault } from './get.util'

if (IS_SERVER) require('dotenv/config')

// you can find implementation for a `zod` library
// in the `main` git branch
const envSchema = object({
	CLIENT_HOST: string().default('http://localhost:3000'),
	CLIENT_PUBLIC_PATH: string().default('/'),
	APP_VERSION: string().default('0.0.0'),
	NODE_ENV: mixed<'production' | 'development' | 'test'>()
		.oneOf(['production', 'development', 'test'])
		.default('development')
})

export type Env = InferType<typeof envSchema>

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
