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
import Cookies from 'universal-cookie'

import { basename } from '@/common'
import { applyBasename } from '@/server/navigation'
import { storage } from '@/server/request'
import { routes } from '@/shared/app'

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
		generateResponse: (match, options) =>
			new Response(renderToReadableStream(match.payload, options), {
				status: match.statusCode,
				headers: match.headers
			})
	})

export const handler = async (request: Request, options: RenderOptions): Promise<Response> => {
	const serverResponse = await storage.run(
		{
			nonce: options.nonce,
			linkTags: options.linkTags,
			url: new URL(request.url),
			headers: request.headers,
			cookies: new Cookies(request.headers.get('cookie'))
		},
		() => fetchServer(request)
	)

	return applyBasename(await renderHTML(request, serverResponse, options))
}
