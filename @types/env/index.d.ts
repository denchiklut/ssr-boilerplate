import type { Env } from "src/common"

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
		env_vars: Partial<Collection<keyof Env, string>>
	}
}
