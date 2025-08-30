import type { Config } from 'jest'

export default {
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/config/spec/setup.ts'],
	transform: {
		'\\.[jt]sx?$': [
			'@swc/jest',
			{
				jsc: {
					parser: {
						syntax: 'typescript',
						tsx: true,
						decorators: true
					},
					transform: {
						react: {
							runtime: 'automatic'
						}
					}
				}
			}
		]
	},
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	moduleNameMapper: {
		'^@/config/(.*)$': '<rootDir>/config/$1',
		'^@/src/(.*)$': '<rootDir>/src/$1',
		'^@/client/(.*)$': '<rootDir>/src/client/$1',
		'^@/server/(.*)$': '<rootDir>/src/server/$1',
		'^@/common/(.*)$': '<rootDir>/src/common/$1',
		'^@/components/(.*)': '<rootDir>/src/client/components/$1',
		'^@/shared/(.*)': '<rootDir>/src/client/components/@shared/$1',
		'^@/pages/(.*)$': '<rootDir>/src/client/pages/$1',
		'^@/utils/(.*)$': '<rootDir>/src/client/utils/$1',
		'\\.(icon|image).(svg)$': '<rootDir>/config/spec/svgr.ts',
		'\\.(css|scss)$': 'identity-obj-proxy'
	}
} satisfies Config
