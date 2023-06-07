import { getDebugger } from 'common/debugger'

export const setEnvVars = (nonce?: string) => {
	const envVars: ENV_VARS = {
		DEBUG: process.env.DEBUG
	}

	return `<script nonce='${nonce}'>window.env_vars = ${JSON.stringify(envVars)}</script>`
}

const debug = getDebugger('common:env.util')
export const getEnvVars = (variable: ENV_KEYS, initial = '') => {
	const ON_SERVER = IS_SERVER || IS_SPA
	const source = ON_SERVER ? process.env : window.env_vars

	if (!(variable in source)) {
		debug('%s is not defined', variable)
	}

	return source[variable] ?? initial
}
