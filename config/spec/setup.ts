import '@testing-library/jest-dom'

declare const global: Window

global.IS_SERVER = false
global.IS_DEV = false
global.IS_SPA = true
global.clientPrefix = 'PUBLIC_'

jest.mock('src/common/env/env.util', () => ({
	...jest.requireActual('src/common/env/env.util'),
	createEnv: jest.fn(() => ({
		CLIENT_HOST: 'http://localhost:3000',
		CLIENT_PUBLIC_PATH: '/',
		APP_VERSION: 'test',
		NODE_ENV: 'test'
	}))
}))
