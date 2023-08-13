export default {
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	globalSetup: '<rootDir>/config/spec/global.ts',
	setupFilesAfterEnv: ['<rootDir>/config/spec/setup.ts'],
	transform: { '\\.[jt]sx?$': 'babel-jest' },
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'^config/(.*)$': '<rootDir>/config/$1',
		'^src/(.*)$': '<rootDir>/src/$1',
		'^client/(.*)$': '<rootDir>/src/client/$1',
		'^server/(.*)$': '<rootDir>/src/server/$1',
		'^common/(.*)$': '<rootDir>/src/common/$1',
		'^components/(.*)': '<rootDir>/src/client/components/$1',
		'^@shared/(.*)': '<rootDir>/src/client/components/@shared/$1',
		'^pages/(.*)$': '<rootDir>/src/client/pages/$1',
		'^utils/(.*)$': '<rootDir>/src/client/utils/$1',
		'^assets/(.*)$': '<rootDir>/src/client/assets/$1',
		'\\.(icon|image).(svg)$': '<rootDir>/config/spec/svgr.ts',
		'\\.(css|scss)$': 'identity-obj-proxy'
	}
}
