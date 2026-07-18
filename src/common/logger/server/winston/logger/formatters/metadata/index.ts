import winston from 'winston'

export const metadata = () =>
	winston.format.metadata({
		fillExcept: [
			'level',
			'message',
			'span_id',
			'stack_trace',
			'trace_id',
			'trace_flags',
			'timestamp'
		]
	})
