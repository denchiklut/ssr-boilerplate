/**
 *  If you have `imports/exports` statements
 *  You need put `Window` & `Express` declarations into `declare global {}`
 *  @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 */

interface Window {
	nonce: string
}

namespace Express {
	interface Response {
		renderApp(): Promise<void>
	}

	interface Request {
		nonce: string
	}
}
