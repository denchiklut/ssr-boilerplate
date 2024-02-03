import type { ReactNode } from 'react'
import type { QueryClient } from '@tanstack/react-query'

export interface AppProps {
	children: ReactNode
	client: QueryClient
}
