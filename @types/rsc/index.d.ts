declare module 'react-server-dom-rspack/client' {
	export function createFromReadableStream<T>(
		stream: ReadableStream<Uint8Array>,
		options?: unknown
	): Promise<T>
	export function createFromFetch<T>(
		response: Promise<globalThis.Response>,
		options?: unknown
	): Promise<T>
	export function encodeReply(
		value: unknown[],
		options?: { temporaryReferences?: unknown; signal?: AbortSignal }
	): Promise<string | FormData>
	export function createTemporaryReferenceSet(): unknown
	export function setServerCallback(
		callback: (id: string, args: unknown[]) => Promise<unknown>
	): void
}

declare module 'react-server-dom-rspack/server.node' {
	import type {
		unstable_DecodeActionFunction,
		unstable_DecodeFormStateFunction,
		unstable_DecodeReplyFunction,
		unstable_LoadServerActionFunction
	} from 'react-router'

	export function renderToReadableStream(
		model: unknown,
		options?: unknown
	): ReadableStream<Uint8Array>
	export function createTemporaryReferenceSet(): unknown
	export const decodeReply: unstable_DecodeReplyFunction
	export const decodeAction: unstable_DecodeActionFunction
	export const decodeFormState: unstable_DecodeFormStateFunction
	export const loadServerAction: unstable_LoadServerActionFunction
}
