import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-plugin-prettier'
import ts from 'typescript-eslint'

import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooks from 'eslint-plugin-react-hooks'
import react from 'eslint-plugin-react'

export default defineConfig([
	{
		ignores: ['node_modules', 'dist', '@types'],
		files: ['**/*.{cjs,mjs,js,jsx,ts,tsx}'],
		plugins: { prettier, js },
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				}
			}
		},
		settings: {
			react: {
				version: 'detect'
			}
		}
	},
	js.configs.recommended,
	ts.configs.recommended,
	react.configs.flat.recommended,
	reactCompiler.configs.recommended,
	reactHooks.configs['recommended-latest'],
	{
		rules: {
			'no-var': 'off',
			'react/display-name': 'off',
			'react-compiler/react-compiler': 'warn',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/no-require-imports': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ caughtErrors: 'none', argsIgnorePattern: '^_' }
			],
			'no-restricted-syntax': [
				'error',
				{
					selector: "VariableDeclaration[kind='var'][declare!=true]",
					message: 'Unexpected var, use let or const instead.'
				}
			]
		}
	}
])
