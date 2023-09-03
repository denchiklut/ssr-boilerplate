import type { Level } from '../../../types'
import { css, colors } from './print.util'

export function print() {
	return function (_: object, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value

		descriptor.value = function (...args: unknown[]) {
			const method = propertyKey as Level
			const { ns } = this as { ns: string }
			const params = [...args]

			if (typeof params[0] !== 'string') params.unshift('%o')

			console[method](
				`%c${ns}%c ${params[0]}`,
				css(colors[method]).join(';'),
				'color: inherit',
				...params.slice(1)
			)

			originalMethod.apply(this, args)
		}

		return descriptor
	}
}
