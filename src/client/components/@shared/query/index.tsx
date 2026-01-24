import {
	HydrationBoundary,
	type QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
	client: QueryClient
}

export const QueryProvider: FC<Props> = ({ children, client }) => (
	<QueryClientProvider client={client}>
		<HydrationBoundary state={IS_SERVER ? undefined: window.__REACT_QUERY_STATE__}>
			{children}
			<ReactQueryDevtools />
		</HydrationBoundary>
	</QueryClientProvider>
)
