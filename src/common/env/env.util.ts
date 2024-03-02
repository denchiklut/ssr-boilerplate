import { decode } from '../decoder'
import { string, mixed, object, type InferType } from 'yup'

const envSchema = object({
	HOST: string().default('http://localhost:3000'),
	PUBLIC_PATH: string().default('/'),
	APP_VERSION: string().default('0.0.0'),
	NODE_ENV: mixed<'production' | 'development' | 'test'>()
		.oneOf(['production', 'development', 'test'])
		.default('development')
})

export type Env = InferType<typeof envSchema>

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
