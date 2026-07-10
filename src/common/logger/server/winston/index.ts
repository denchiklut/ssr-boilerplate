import type { Level } from '../../types'
import { logger } from './logger'
import { source } from './source'

const levels = { log: 'notice', debug: 'debug', info: 'info', warn: 'warn', error: 'error' }

export function winston<This, Args extends unknown[], Return>() {
	return function (
		target: (this: This, ...args: Args) => Return,
		context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
	) {
		const level = levels[String(context.name) as Level]

		function decorate(this: This, ...args: Args) {
			logger.log(
				level,
				...(args as unknown as [string, ...unknown[]]),
				IS_PROD ? source(decorate) : undefined
			)

			return target.call(this, ...args)
		}

		return decorate
	}
}
