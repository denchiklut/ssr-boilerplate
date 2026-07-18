import { SPLAT } from 'triple-beam';
import type { Logform } from 'winston';

export type Info = Logform.TransformableInfo & { stack?: string; cause?: unknown };

const stackOf = (error: Error) => error.stack ?? `${error.name}: ${error.message}`;

const causedBy = (cause: unknown, depth = 0): string[] =>
    Error.isError(cause) && depth < 5 ? [`Caused by: ${stackOf(cause)}`, ...causedBy(cause.cause, depth + 1)] : [];

export const getError = (info: Info) => {
    const args = (info[SPLAT] as unknown[]) ?? [];
    const index = args.findIndex(arg => Error.isError(arg));

    if (index !== -1) return args.splice(index, 1)[0] as Error;
    return Error.isError(info.message) ? info.message : null;
};

export const getStack = (info: Info, error: Error | null) =>
    [
        ...(error ? [stackOf(error)] : typeof info.stack === 'string' ? [info.stack] : []),
        ...causedBy(error?.cause ?? info.cause),
    ]
        .filter(Boolean)
        .join('\n');

export const getMessage = (info: Info, error: Error | null) => {
    const label = Error.isError(info.message) ? info.message.message : String(info.message ?? '');
    const merged = error === info.message || (typeof info.stack === 'string' && info.stack === error?.stack);

    return !merged && error?.message ? [label, error.message].filter(Boolean).join(' ') : label;
};
