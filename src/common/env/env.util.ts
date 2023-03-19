import { getDebugger } from 'common/debugger'

export const setEnvVars = (nonce?: string) => {
	const envVars: ENV_VARS = {
		DEBUG: process.env.DEBUG
	}

	return `<script nonce='${nonce}'>window.env_vars = ${JSON.stringify(envVars)}</script>`
}

export const getEnvVars = (variable: ENV_KEYS, initial = '') => {
	const debug = getDebugger('common:env.util')
	const source =
		IS_SERVER || IS_SPA
			? process.env
			: variable in window.env_vars // in case you want to override some variables
			? window.env_vars
			: process.env

	if (!(variable in source)) {
		debug('%s is not defined', variable)
	}

	return source[variable] ?? initial
}
