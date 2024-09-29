import type { ReactNode } from 'react'
import type { QueryClient } from '@tanstack/react-query'
import type { HelmetServerState } from 'react-helmet-async'

export interface AppProps {
	nonce: string
	children: ReactNode
	client: QueryClient
	helmetContext?: {
		helmet?: HelmetServerState
	}
}
