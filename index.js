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
		'resourge-custom-react'
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
		'react/jsx-indent': [1, 'tab'],
		'react/jsx-sort-props': [1, {
			callbacksLast: true,
			reservedFirst: true,
			locale: 'en'
		}],
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


		"react/jsx-one-expression-per-line": [1, { "allow": "single-child" }],
		"react/jsx-curly-spacing": ["error", {
			"when": "never",
			"children": {
				"when": "always"
			}
		}],
		'react/jsx-closing-bracket-location': [2, 'line-aligned'],
		"react/self-closing-comp": ["error", {
			"component": true,
			"html": true
		}],
		"react-hooks/exhaustive-deps": 'off',
		'operator-linebreak': ['error', 'before', { "overrides": { "?": "before" } }],
		'react/jsx-max-props-per-line': ['error', {
			maximum: 1,
			when: 'multiline'
		}],

		"resourge-custom-react/jsx-no-leaked-render": [2, { "validStrategies": ["ternary"] }],
		'resourge-custom-react/jsx-first-prop-new-line': ['error', "multiprop"],
		'resourge-custom-react/jsx-curly-newline': [2, { multiline: "require", singleline: "consistent" }],
		'resourge-custom-react/export-default-react-components': 'error'
	},
	settings: {
		react: {
			// React version. "detect" automatically picks the version you have installed.
			version: 'detect'
		},
	}
};
