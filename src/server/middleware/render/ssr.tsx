import type { ReactFormState } from 'react-dom/client'
import { renderToReadableStream } from 'react-dom/server'
import {
	unstable_RSCStaticRouter as RSCStaticRouter,
	unstable_routeRSCServerRequest as routeRSCServerRequest
} from 'react-router'
import { createFromReadableStream } from 'react-server-dom-rspack/client'

import type { RenderOptions } from './rsc'

export const renderHTML = (request: Request, serverResponse: Response, options: RenderOptions) =>
	routeRSCServerRequest({
		request,
		serverResponse,
		createFromReadableStream,
		async renderHTML(getPayload) {
			const payload = await getPayload()
			const formState = (payload.type === 'render' ? await payload.formState : undefined) as
				| ReactFormState
				| undefined

			return renderToReadableStream(<RSCStaticRouter getPayload={getPayload} />, {
				formState,
				nonce: options.nonce,
				signal: request.signal,
				bootstrapScripts: options.bootstrapScripts,
				bootstrapScriptContent: options.bootstrapScriptContent
			})
		}
	})
