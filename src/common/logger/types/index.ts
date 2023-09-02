export interface ILogger {
	log(...args: unknown[]): void
	debug(...args: unknown[]): void
	info(...args: unknown[]): void
	warn(...args: unknown[]): void
	error(...args: unknown[]): void
}

export type Level = keyof ILogger
