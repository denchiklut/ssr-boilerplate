import { string, mixed, object, type InferType } from 'yup'
import { getOrDefault } from './get.util'
import { createEnv } from './create-env'

if (IS_SERVER) require('dotenv/config')

const envSchema = object({
	CLIENT_HOST: string().default('http://localhost:3000'),
	CLIENT_PUBLIC_PATH: string().default('0.0.0'),
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
		envs: IS_SERVER ? process.env : window.env_vars
	})
)

export const setEnvVars = (nonce: string) => {
	const clientEnv = Object.entries(getENV())
		.filter(([k]) => k.startsWith(clientPrefix))
		.reduce<Collection<string, unknown>>((res, [k, v]) => {
			res[k] = v
			return res
		}, {})

	return `<script nonce='${nonce}'>window.env_vars = Object.freeze(${JSON.stringify(clientEnv)})</script>`
}
