import type { ILogger } from '../types'
import { print } from './print'

export class ClientLogger implements ILogger {
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
