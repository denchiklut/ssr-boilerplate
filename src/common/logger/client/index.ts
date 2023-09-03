import type { ILogger } from '../types'
import { print } from './utils'

export class ClientLogger implements ILogger {
	constructor(public ns: string) {}

	@print()
	log() {}

	@print()
	debug() {}

	@print()
	info() {}

	@print()
	warn() {}

	@print()
	error() {}
}
