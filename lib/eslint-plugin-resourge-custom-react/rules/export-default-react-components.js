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
	create: (context) => {
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
		var namedExportNode = null;

		return {
			ExportDefaultDeclaration: function () {
				hasDefaultExport = true;
			},

			ExportNamedDeclaration: function (node) {
				// if there are specifiers, node.declaration should be null
				if (!node.declaration) {
					return;
				}
				var type = node.declaration.type;

				if (
					type === 'TSTypeAliasDeclaration'
					|| type === 'TypeAlias'
					|| type === 'TSInterfaceDeclaration'
					|| type === 'InterfaceDeclaration'
				) {
					return;
				}

				namedExportNode = node;
			},

			'Program:exit': function () {
				if (hasDefaultExport) {
					return;
				}
				context.report(namedExportNode, messages.noDefaultExportComponent);
			}
		}
	}
};