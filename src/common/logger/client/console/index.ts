import type { Level, Logger } from '../../types'
import { colors, css } from './utils'

type Constructor = abstract new (...args: never[]) => Logger

export function Console() {
	return function <T extends Constructor>(target: T, _context: ClassDecoratorContext<T>) {
		for (const method of Object.keys(colors) as Level[]) {
			const decorate = function (...args: unknown[]) {
				const params = [...args]

				if (typeof params[0] !== 'string') params.unshift('%o')

				if (IS_DEV) {
					console[method](
						`%capp%c ${params[0]}`,
						css(colors[method]).join(';'),
						'color: inherit',
						...params.slice(1)
					)
				} else {
					console[method](...args)
				}
			}

			Object.defineProperty(target.prototype, method, {
				configurable: true,
				writable: true,
				value: decorate
			})
		}
	}
}
