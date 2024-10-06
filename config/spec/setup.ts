import '@testing-library/jest-dom'

globalThis.IS_SERVER = false
globalThis.IS_DEV = false
globalThis.IS_SPA = true
globalThis.clientPrefix = 'CLIENT_'

jest.mock('src/common/env/env.util', () => ({
	...jest.requireActual('src/common/env/env.util'),
	createEnv: jest.fn(() => ({
		CLIENT_HOST: 'http://localhost:3000',
		CLIENT_PUBLIC_PATH: '/',
		APP_VERSION: 'test',
		NODE_ENV: 'test'
	}))
}))
