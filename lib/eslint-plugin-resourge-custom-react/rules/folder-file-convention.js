const docsUrl = require('eslint-config-resourge-react/lib/eslint-plugin-resourge-custom-react/util/docsUrl.js');
const { getBasename, getFilePath, getFilename, getFolderPath, getAllFolders } = require('eslint-config-resourge-react/lib/eslint-plugin-resourge-custom-react/util/filename.js');
const report = require("../util/report");
const { join, posix, sep } = require('path');

const messages = {
	mustBePascalCase: 'Component file must be in pascal case',
	mustBeCamelCase: 'Component folder must be in camel case',
	noMatch: 'Folder name and file name don\'t match',
};

const CAMEL_CASE = /^[a-z]+(?:[A-Z][a-z]+)*$/;
const PASCAL_CASE = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
	meta: {
		type: 'layout',
		messages,
		docs: {
			description: 'Component file name and folder must match. Folder name must be camel case version of file name. File name must be a pascal case.',
			category: 'Layout & Formatting',
			recommended: false,
			url: docsUrl('folder-file-convention'),
		},
		fixable: null
	},

	create(context) {
		return {
			'Program:exit': (node) => {
				const filenameWithPath = getFilePath(context);

				if (filenameWithPath.includes('.tsx') && !(filenameWithPath.startsWith('use') || filenameWithPath.startsWith('Use'))) {
					const filename = getFilename(filenameWithPath);
					const basename = getBasename(filename);
					const folderPath = getAllFolders(filenameWithPath.replace(filename, '')).at(-1);

					if (folderPath.toLowerCase() !== filename.toLowerCase()) {
						report(context, messages.noMatch, 'noMatch', {
							node
						});
					}

					if (!PASCAL_CASE.test(filename)) {
						report(context, messages.mustBePascalCase, 'mustBePascalCase', {
							node
						});
					}

					if (!CAMEL_CASE.test(folderPath)) {
						report(context, messages.mustBeCamelCase, 'mustBeCamelCase', {
							node
						});
					}
				}
			},
		};
	},
};