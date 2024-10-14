import globals from 'globals'
import react from 'eslint-plugin-react'
import prettier from 'eslint-plugin-prettier'
import reactForget from 'eslint-plugin-react-compiler'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import { fixupPluginRules } from '@eslint/compat'
import tsParser from '@typescript-eslint/parser'

export default [
	{
		ignores: ['**/node_modules', '**/dist', '**/webpack']
	},
	{
		files: ['*.ts', '*.tsx'],
		plugins: {
			prettier,
			'@typescript-eslint': typescriptEslint,
			'react-compiler': fixupPluginRules(reactForget),
			react: fixupPluginRules(react),
		},
		rules: {
			'react-compiler/react-compiler': 'error'
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.jest
			},
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
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
	}
]
