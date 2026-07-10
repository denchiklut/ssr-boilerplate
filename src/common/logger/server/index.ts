import type { ILogger } from '../types'
import { winston } from './winston'

export class ServerLogger implements ILogger {
	@winston()
	log() {}

	@winston()
	debug() {}

	@winston()
	info() {}

	@winston()
	warn() {}

	@winston()
	error() {}
}
