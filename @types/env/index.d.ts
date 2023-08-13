import type { Env } from "src/common"

declare global {
	declare const IS_DEV: boolean
	declare const IS_PROD: boolean
	declare const IS_SERVER: boolean
	declare const IS_SPA: boolean

	namespace NodeJS {
		interface ProcessEnv extends Partial<Collection<keyof Env, string>> {}
	}

	interface Window {
		IS_SPA: boolean
		IS_SERVER: boolean
		IS_DEV: boolean
		IS_PROD: boolean

		env_vars: Partial<Collection<keyof Env, string>>
	}
}
