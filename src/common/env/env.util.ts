import { decoder } from '../decoder'
import { z, type TypeOf } from 'zod'

const envSchema = z.object({
	HOST: z.string().url().default('http://localhost:3000'),
	PUBLIC_PATH: z.string().default('/'),
	DEBUG: z.string().optional(),
	APP_VERSION: z.string().default('0.0.0'),
	NODE_ENV: z.enum(['production', 'development']).default('development')
})

export type Env = TypeOf<typeof envSchema>

export const getENV = decoder(envSchema, IS_SERVER || IS_SPA ? process.env : window.env_vars ?? {})

export const setEnvVars = () => {
	const { PUBLIC_PATH, HOST, DEBUG, APP_VERSION, NODE_ENV } = getENV()

	return `window.env_vars = Object.freeze(${JSON.stringify({
		HOST,
		DEBUG,
		PUBLIC_PATH,
		APP_VERSION,
		NODE_ENV
	})})`
}
