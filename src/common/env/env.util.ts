import { getDebugger } from 'common/debugger'

export const setEnvVars = (nonce?: string) => {
	const envVars: ENV_VARS = {
		DEBUG: process.env.DEBUG,
		NODE_ENV: process.env.NODE_ENV,
		EXAMPLE_HOST: process.env.EXAMPLE_HOST
	}

	return `<script nonce='${nonce}'>window.env_vars = ${JSON.stringify(envVars)}</script>`
}

export const getEnvVars = (variable: ENV_KEYS, initial = '') => {
	const debug = getDebugger('common:env.util')
	const source = IS_SERVER || IS_SPA ? process.env : window.env_vars

	if (!(variable in source)) {
		debug('%s is not defined', variable)
	}

	return source[variable] ?? initial
}
