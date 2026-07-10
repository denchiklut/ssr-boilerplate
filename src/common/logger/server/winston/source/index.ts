export function source(caller: (...args: never[]) => unknown) {
	const limit = Error.stackTraceLimit
	Error.stackTraceLimit = 1
	const err = new Error()
	Error.captureStackTrace(err, caller)
	Error.stackTraceLimit = limit

	const [, frame = ''] = err.stack?.split('\n') ?? []
	const match = frame.match(/at (?:async )?(?:(.+?) \()?(.+?):(\d+):(\d+)\)?$/)
	if (!match) return

	const [, func, file = '', line = '0'] = match
	const source = { func, line: Number(line), file: file.replace(/^webpack:\/\/[^/]+\//, '') }
	const attrs = ['file', 'func', 'line'] as const

	return Object.fromEntries(attrs.map(key => [`src.${key}`, source[key]]))
}
