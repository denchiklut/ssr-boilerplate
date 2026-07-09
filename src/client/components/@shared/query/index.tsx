'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type FC, type ReactNode, useState } from 'react'

interface Props {
	children: ReactNode
}

export const QueryProvider: FC<Props> = ({ children }) => {
	const [client] = useState(() => new QueryClient())

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
