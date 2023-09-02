import type { Level } from '../../../types'

export const css = (color: string) => [
	`background: ${color}`,
	'border-radius: 0.5em',
	'color: white',
	'font-weight: bold',
	'padding: 2px 0.5em'
]

export const colors: Collection<Level, string> = {
	debug: `#7f8c8d`,
	log: '#2ecc71',
	warn: '#f39c12',
	error: '#c0392b',
	info: '#3498db'
} as const
