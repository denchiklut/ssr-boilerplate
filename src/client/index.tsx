import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import {
	unstable_createCallServer as createCallServer,
	unstable_getRSCStream as getRSCStream,
	unstable_RSCHydratedRouter as RSCHydratedRouter,
	type unstable_RSCPayload as RSCPayload
} from 'react-router/dom'
import {
	createFromReadableStream,
	createTemporaryReferenceSet,
	encodeReply,
	setServerCallback
} from 'react-server-dom-rspack/client'

import { getENV } from '@/common'

__webpack_public_path__ = getENV('CLIENT_PUBLIC_PATH')

setServerCallback(
	createCallServer({
		createFromReadableStream,
		createTemporaryReferenceSet,
		encodeReply
	})
)

createFromReadableStream<RSCPayload>(getRSCStream()).then(payload => {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<RSCHydratedRouter
					payload={payload}
					createFromReadableStream={createFromReadableStream}
				/>
			</StrictMode>,
			{ formState: payload.type === 'render' ? payload.formState : undefined }
		)
	})
})

if (IS_DEV) {
	// server components can't be hot-patched in the browser — refetch the RSC payload instead
	const hot = require('webpack-hot-middleware/client?name=client')
	hot.subscribeAll((event: { action?: string }) => {
		if (event.action !== 'rsc-update') return
		// reload only if the update lands before hydration exposed the router
		if (window.__reactRouterDataRouter) void window.__reactRouterDataRouter.revalidate()
		else window.location.reload()
	})
}
