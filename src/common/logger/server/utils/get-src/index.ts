export function getSrc(caller: (...args: never[]) => unknown) {
	const limit = Error.stackTraceLimit
	Error.stackTraceLimit = 1
	const err = new Error()
	Error.captureStackTrace(err, caller)
	Error.stackTraceLimit = limit

	const [, frame = ''] = err.stack?.split('\n') ?? []
	const match = frame.match(/at (?:async )?(?:(.+?) \()?(.+?):(\d+):(\d+)\)?$/)
	if (!match) return

	const [, func, file = '', line = '0'] = match
	return { func, line: Number(line), file: file.replace(/^webpack:\/\/[^/]+\//, '') }
}
