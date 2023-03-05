declare const IS_DEV: boolean
declare const IS_PROD: boolean
declare const IS_SERVER: boolean
declare const IS_SPA: boolean


type ENV_KEYS =
	| 'DEBUG'
	| 'NODE_ENV'
	| 'EXAMPLE_HOST'

type ENV_VARS = Partial<Collection<ENV_KEYS, string>>

namespace NodeJS {
  interface Process {
	env: ENV_VARS
  }
}

interface Window {
  env_vars: ENV_VARS
}
