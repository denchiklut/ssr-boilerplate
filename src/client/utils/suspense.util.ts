export function wrapPromise<T>(promise: Promise<T>) {
	let result: T
	let status = 'pending'
	const suspender = promise.then(
		r => {
			status = 'success'
			result = r
		},
		e => {
			status = 'error'
			result = e
		}
	)

	return {
		read() {
			if (status === 'pending') throw suspender
			else if (status === 'error') throw result

			return result
		}
	}
}
