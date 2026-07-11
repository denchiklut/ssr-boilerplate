import { StrictMode, startTransition } from 'react'
import { hydrateRoot, type ReactFormState } from 'react-dom/client'
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

createFromReadableStream<RSCPayload>(getRSCStream()).then(async payload => {
	const formState = (
		payload.type === 'render' ? await payload.formState : undefined
	) as ReactFormState

	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<RSCHydratedRouter
					payload={payload}
					createFromReadableStream={createFromReadableStream}
				/>
			</StrictMode>,
			{ formState }
		)
	})
})

if (IS_DEV) {
	// server components can't be hot-patched in the browser — reload on server rebuilds
	const hot = require('webpack-hot-middleware/client?name=client')
	hot.subscribeAll((event: { action?: string }) => {
		if (event.action === 'rsc-update') window.location.reload()
	})
}
