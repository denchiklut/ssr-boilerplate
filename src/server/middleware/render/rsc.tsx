import {
	unstable_matchRSCServerRequest as matchRSCServerRequest,
	RouterContextProvider
} from 'react-router'
import {
	createTemporaryReferenceSet,
	decodeAction,
	decodeFormState,
	decodeReply,
	loadServerAction,
	renderToReadableStream
} from 'react-server-dom-rspack/server.node'

import { basename } from '@/common'
import { type RenderMeta, renderContext, routes } from '@/shared/app'

import { renderHTML } from './ssr'

export interface RenderOptions extends RenderMeta {
	bootstrapScripts?: string[]
	bootstrapScriptContent?: string
}

const fetchServer = (request: Request, meta: RenderMeta) => {
	const requestContext = new RouterContextProvider()
	requestContext.set(renderContext, meta)

	return matchRSCServerRequest({
		createTemporaryReferenceSet,
		decodeAction,
		decodeFormState,
		decodeReply,
		loadServerAction,
		basename,
		request,
		requestContext,
		routes: routes(),
		generateResponse: (match, options) =>
			new Response(renderToReadableStream(match.payload, options), {
				status: match.statusCode,
				headers: match.headers
			})
	})
}

export const handler = async (request: Request, options: RenderOptions): Promise<Response> => {
	const meta: RenderMeta = {
		nonce: options.nonce,
		cookie: options.cookie,
		linkTags: options.linkTags
	}

	return renderHTML(request, await fetchServer(request, meta), options)
}
