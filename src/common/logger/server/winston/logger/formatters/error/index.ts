import { format } from 'winston'

import { getError, getMessage, getStack, type Info } from './utils'

export const error = format(info => {
	if (info.level !== 'error') return info

	const error = getError(info)
	const stack = getStack(info, error)
	const message = getMessage(info, error)

	const output = {
		...info,
		message: IS_DEV && stack ? `${message}\n${stack}` : message,
		...(IS_PROD && stack && { stack_trace: stack })
	} as Info

	if (Error.isError(output.cause)) delete output.cause
	delete output.stack

	return output
})
