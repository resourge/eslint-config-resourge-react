const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'eslint-config-resourge-typescript',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	plugins: [
		'react',
	],
	overrides: [
		{
			files: ['*.test.*'], // Your TypeScript files extension
			extends: [
				'plugin:testing-library/react'
			],
			rules: {
				'testing-library/prefer-presence-queries': 'off'
			}
		}
	],
	rules: {
		'react/no-unstable-nested-components': 0,
		'react/no-multi-comp': [1],
		'react/jsx-curly-newline': [1],
		'react/jsx-indent': [1, 'tab'],
		'react/jsx-closing-bracket-location': [1],
		'react/jsx-one-expression-per-line': [1, {
			allow: 'literal'
		}],
		'react/jsx-sort-props': [1, {
			callbacksLast: true,
			reservedFirst: true,
			locale: 'en'
		}],
		'react/jsx-max-props-per-line': [1, {
			maximum: 1,
			when: 'multiline'
		}],
		'react/jsx-first-prop-new-line': [2, 'multiline-multiprop'],
		'react/jsx-wrap-multilines': ['error', {
			declaration: 'parens-new-line',
			assignment: 'parens-new-line',
			return: 'parens-new-line',
			arrow: 'parens-new-line',
			condition: 'parens-new-line',
			logical: 'parens-new-line',
			prop: 'parens-new-line'
		}
		],
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 0,
	},
	settings: {
		react: {
			// React version. "detect" automatically picks the version you have installed.
			version: 'detect'
		},
	}
};
