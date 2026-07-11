import { Logger } from '../types'
import { Winston } from './winston'

@Winston()
export class ServerLogger extends Logger {}
