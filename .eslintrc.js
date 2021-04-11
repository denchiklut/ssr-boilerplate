const { resolve } = require('path')

module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react'],
    env: {
        browser: true,
        jest: true
    },
    extends: [
        'prettier',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        project: resolve(__dirname, './tsconfig.json'),
        tsconfigRootDir: __dirname,
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        quotes: ['warn', 'single'],

        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        'react/jsx-filename-extension': [
            'warn',
            {
                extensions: ['.jsx', '.tsx']
            }
        ],
        'react/prop-types': 'off'
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}
