import type { ReactNode } from 'react'
import type { HelmetServerState } from 'react-helmet-async'

export interface AppProps {
	nonce: string
	children: ReactNode
	helmetContext?: { helmet?: HelmetServerState }
}
