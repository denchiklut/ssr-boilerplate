export const typescript = {
	test: /\.[jt]sx?$/,
	exclude: /node_modules/,
	loader: "builtin:swc-loader",
	options: {
		jsc: {
			parser: {
				syntax: "typescript",
				tsx: true,
				decorators: true,
			},
			transform: {
				react: { runtime: "automatic" },
			}
		},
	},
}
