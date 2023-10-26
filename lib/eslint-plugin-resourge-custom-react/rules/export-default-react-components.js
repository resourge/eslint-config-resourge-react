const report = require("../util/report");
const Components = require('../util/Components');

const messages = {
	noDefaultExportComponent: 'A component files requires a default export.',
};

function containsUppercase(str) {
	return /[A-Z]/.test(str);
}

module.exports = {
	meta: {
		messages,
		type: "problem"
	},
	defaultOptions: [],
	create: Components.detect((context, components) => {
		const filename = context.getFilename();
		const shouldScan = filename.endsWith(".jsx") || filename.endsWith(".tsx");
		if (
			!shouldScan
			|| !containsUppercase(filename)
			|| filename.includes(".test.")
			|| filename.includes(".spec.")
			|| filename.includes(".stories.")
		) {
			return {};
		}

		var hasDefaultExport = false;
		var hasAnyExport = false;

		return {
			ExportDefaultDeclaration: function () {
				hasDefaultExport = true;
			},

			ExportNamedDeclaration: function (node) {
				// if there are specifiers, node.declaration should be null
				if (!node.declaration) {
					return;
				}
				hasAnyExport = true;
			},

			'Program:exit': function (programNode) {
				if (!hasAnyExport || hasDefaultExport) {
					return;
				}

				context.report({
					node: programNode,
					messageId: 'noDefaultExportComponent',
				});
			}
		}
	})
};