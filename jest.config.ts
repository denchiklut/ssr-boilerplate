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
	moduleFileExtensions: ['ts', 'tsx', 'js']
} satisfies Config
