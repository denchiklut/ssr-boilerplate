import type { Env } from "src/common"

type PickClientVars<T> = {
	[K in keyof T as K extends `CLIENT_${string}` |'NODE_ENV' ? K : never]: T[K]
}

declare global {
	declare var IS_DEV: boolean
	declare var IS_PROD: boolean
	declare var IS_SERVER: boolean
	declare var IS_SPA: boolean
	declare var clientPrefix: string

	namespace NodeJS {
		interface ProcessEnv extends Partial<Collection<keyof Env, string>> {}
	}

	interface Window {
		env_vars: PickClientVars<Env>
	}
}
