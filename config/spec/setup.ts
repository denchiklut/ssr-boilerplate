import '@testing-library/jest-dom'

window.IS_SERVER = false
window.IS_DEV = false
window.IS_SPA = true
window.clientPrefix = 'PUBLIC_'

jest.mock('src/common/env/create-env', () => ({
	...jest.requireActual('src/common/env/create-env'),
	createEnv: jest.fn(() => ({
		CLIENT_HOST: 'http://localhost:3000',
		CLIENT_PUBLIC_PATH: '/',
		APP_VERSION: 'test',
		NODE_ENV: 'test'
	}))
}))
