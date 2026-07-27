import { setTimeout } from 'node:timers/promises'

import { SessionGate } from '@/components/private-client'

export default async function () {
	// Demo only: holds the navigation open long enough to see the pending state.
	// Every navigation to this route pays it, document requests included.
	await setTimeout(2_000)

	return <SessionGate />
}
