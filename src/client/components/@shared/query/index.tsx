import {
	type DehydratedState,
	dehydrate,
	HydrationBoundary,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { type FC, type ReactNode, useState } from 'react'

interface Props {
	children: ReactNode
	queryClient?: QueryClient
	state?: DehydratedState
}

// Get dehydrated state from window on client side
const getDehydratedState = (): DehydratedState | undefined => {
	if (typeof window !== 'undefined') {
		return (window as { __REACT_QUERY_STATE__?: DehydratedState }).__REACT_QUERY_STATE__
	}
	return undefined
}

export const QueryProvider: FC<Props> = ({ children, queryClient, state }) => {
	// Create a stable QueryClient instance for client-side if not provided
	const [client] = useState(() => queryClient ?? new QueryClient())

	// On server, use dehydrate; on client, use hydrated state from window
	const hydrationState = queryClient ? dehydrate(queryClient) : (state ?? getDehydratedState())

	return (
		<QueryClientProvider client={client}>
			<HydrationBoundary state={hydrationState}>{children}</HydrationBoundary>
		</QueryClientProvider>
	)
}
