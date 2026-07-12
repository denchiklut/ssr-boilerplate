import { StrictMode, startTransition } from 'react'
import { hydrateRoot } from 'react-dom/client'
import {
	unstable_createCallServer as createCallServer,
	unstable_getRSCStream as getRSCStream,
	unstable_RSCHydratedRouter as RSCHydratedRouter,
	type unstable_RSCPayload as RSCPayload
} from 'react-router/dom'
import * as reactRouterClientBoundary from 'react-router/internal/react-server-client'
import {
	createFromReadableStream,
	createTemporaryReferenceSet,
	encodeReply,
	setServerCallback
} from 'react-server-dom-rspack/client'

import { getENV } from '@/common'

__webpack_public_path__ = getENV('CLIENT_PUBLIC_PATH')

/**
 * react-router 8 ships ESM-only dist files, so in production rspack tree-shakes the
 * re-exports of its `'use client'` boundary (`UNSAFE_WithComponentProps`, `Outlet`, …) —
 * they are only referenced at runtime through the RSC client manifest. Anchor the whole
 * namespace so hydration can resolve them (react-router 7 shipped CJS, which was immune).
 * A bare side-effect import is NOT enough: it marks no exports as used.
 */
Object.assign(globalThis, { __reactRouterClientBoundary: reactRouterClientBoundary })

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
	// server components can't be hot-patched in the browser — reload on server rebuilds
	const hot = require('webpack-hot-middleware/client?name=client')
	hot.subscribeAll((event: { action?: string }) => {
		if (event.action === 'rsc-update') window.location.reload()
	})
}
