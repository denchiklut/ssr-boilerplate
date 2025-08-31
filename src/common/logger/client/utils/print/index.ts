import type { Level } from '../../../types'
import { colors, css } from './print.util'

export function print<This extends { ns: string }, Args extends unknown[], Return>(
	target: (this: This, ...args: Args) => Return,
	context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>
) {
	const method = String(context.name) as Level

	function decorate(this: This, ...args: Args): Return {
		const params = [...args]

		if (typeof params[0] !== 'string') params.unshift('%o')

		if (IS_PROD) {
			console[method](...args)
		} else {
			console[method](
				`%c${this.ns}%c ${params[0]}`,
				css(colors[method]).join(';'),
				'color: inherit',
				...params.slice(1)
			)
		}

		return target.call(this, ...args)
	}

	return decorate
}
