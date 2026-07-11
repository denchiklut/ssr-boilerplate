export abstract class Logger {
	declare log: (...args: unknown[]) => void
	declare debug: (...args: unknown[]) => void
	declare info: (...args: unknown[]) => void
	declare warn: (...args: unknown[]) => void
	declare error: (...args: unknown[]) => void
}

export type Level = keyof Logger
