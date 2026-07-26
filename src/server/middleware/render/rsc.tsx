import type { LinkHTMLAttributes } from 'react'
import { unstable_matchRSCServerRequest as matchRSCServerRequest } from 'react-router'
import {
	createTemporaryReferenceSet,
	decodeAction,
	decodeFormState,
	decodeReply,
	loadServerAction,
	renderToReadableStream
} from 'react-server-dom-rspack/server.node'

import { basename } from '@/common'
import { logger } from '@/common/logger'
import { applyBasename } from '@/server/navigation'
import { createRequestStore, storage } from '@/server/request'
import { routes } from '@/shared/app'

import { finalizeResponse } from './finalize'
import { renderHTML } from './ssr'

export interface RenderOptions {
	bootstrapScripts?: string[]
	bootstrapScriptContent?: string
	nonce: string
	linkTags: LinkHTMLAttributes<HTMLLinkElement>[]
}

const fetchServer = (request: Request) =>
	matchRSCServerRequest({
		createTemporaryReferenceSet,
		decodeAction,
		decodeFormState,
		decodeReply,
		loadServerAction,
		basename,
		request,
		routes: routes(),
		onError: logger.error,
		// react-router's options carry no abort signal — wire the request's own,
		// so a client disconnect ends the Flight stream (as it already does Fizz)
		generateResponse: (match, options) =>
			new Response(
				renderToReadableStream(match.payload, { ...options, signal: request.signal }),
				{
					status: match.statusCode,
					headers: match.headers
				}
			)
	})

export const handler = (request: Request, options: RenderOptions): Promise<Response> => {
	const store = createRequestStore(request, options)

	// One ALS scope around both render stages, so response mutations made at any
	// point of the render are visible when `finalizeResponse` snapshots them.
	return storage.run(store, async () => {
		const response = applyBasename(
			await renderHTML(request, await fetchServer(request), options)
		)

		return finalizeResponse(response, store)
	})
}
