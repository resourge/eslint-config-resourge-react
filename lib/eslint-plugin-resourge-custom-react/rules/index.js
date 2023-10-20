'use strict';

/* eslint global-require: 0 */

const prefix = 'resource-react'

module.exports = {
	`${prefix}/jsx-curly-newline`: require('./jsx-curly-newline'),
	`${prefix}/jsx-first-prop-new-line`: require('./jsx-first-prop-new-line'),
		`${prefix}/jsx-no-leaked-render`: require('./jsx-no-leaked-render')
};
