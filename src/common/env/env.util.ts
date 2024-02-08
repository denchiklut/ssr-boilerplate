import { decode } from '../decoder'
import { z, type TypeOf } from 'zod'

const envSchema = z.object({
	HOST: z.string().url().default('http://localhost:3000'),
	PUBLIC_PATH: z.string().default('/'),
	APP_VERSION: z.string().default('0.0.0'),
	NODE_ENV: z.enum(['production', 'development']).default('development')
})

export type Env = TypeOf<typeof envSchema>

export const getENV = decode(envSchema, IS_SERVER || IS_SPA ? process.env : window.env_vars)

export const setEnvVars = (nonce: string) => {
	const { PUBLIC_PATH, HOST, APP_VERSION, NODE_ENV } = getENV()

	return `<script nonce='${nonce}'>window.env_vars = Object.freeze(${JSON.stringify({
		HOST,
		PUBLIC_PATH,
		APP_VERSION,
		NODE_ENV
	})})</script>`
}
