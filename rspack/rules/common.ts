export const typescript = {
	test: /\.[jt]sx?$/,
	exclude: /node_modules/,
	use: {
	loader: "builtin:swc-loader",
		options: {
			jsc: {
				parser: {
					syntax: "typescript",
					tsx: true,
					decorators: true,
				},
				transform: {
					react: {
						runtime: "automatic"
					}
				}
			},
		},
	},
		type: 'javascript/auto',
}
