/**
 *  If you have `imports/exports` statements
 *  You put `Window` & `Express` declarations into `declare global {}`
 *  @see https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 */

namespace Express {
	interface Response {
		renderApp(): Promise<void>
	}
}
