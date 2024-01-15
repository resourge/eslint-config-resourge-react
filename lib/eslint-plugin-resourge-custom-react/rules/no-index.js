const docsUrl = require('../util/docsUrl.js');
const { getBasename, getFilePath, getFilename, getFolderPath, getAllFolders } = require('../util/filename.js');
const report = require("../util/report");
const { join, posix, sep } = require('path');

const messages = {
	noIndex: 'The filename "index" is not allowed',
};

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
	meta: {
		type: 'layout',
		messages,
		docs: {
			description: 'A file cannot be named "index"',
			category: 'Layout & Formatting',
			recommended: false,
			url: docsUrl('no-index'),
		},
		fixable: null
	},

	create(context) {
		return {
			'Program:exit': (node) => {
				const filenameWithPath = getFilePath(context);

				const filename = getFilename(filenameWithPath);
				const basename = getBasename(filename);

				if (basename === 'index') {
					report(context, messages.noIndex, 'noIndex', {
						node
					});
					return;
				}
			},
		};
	},
};