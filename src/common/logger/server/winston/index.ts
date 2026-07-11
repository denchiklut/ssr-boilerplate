import type { Logger } from '../../types'
import { levels, logger } from './logger'
import { source } from './source'

type Constructor = abstract new (...args: never[]) => Logger

export function Winston() {
	return function <T extends Constructor>(target: T, _: ClassDecoratorContext<T>) {
		for (const [method, level] of Object.entries(levels)) {
			const decorate = function (...args: [string, ...unknown[]]) {
				logger.log(level, ...args, IS_PROD ? source(decorate) : undefined)
			}

			Object.defineProperty(target.prototype, method, {
				configurable: true,
				writable: true,
				value: decorate
			})
		}
	}
}
