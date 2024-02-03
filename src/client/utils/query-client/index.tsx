import type { FC, ReactNode } from 'react'
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useMounted } from './utils'

interface Props {
	client: QueryClient
	children: ReactNode
}
export const ClientProvider: FC<Props> = ({ client, children }) => {
	const isMounted = useMounted()

	return (
		<QueryClientProvider client={client}>
			{children}
			{isMounted && <ReactQueryDevtools />}
		</QueryClientProvider>
	)
}
