import type { ReactNode } from 'react'
import type { HelmetServerState } from 'react-helmet-async'
import type Cookies from 'universal-cookie'

export interface AppProps {
	nonce: string
	cookies?: Cookies
	children: ReactNode
	helmetContext?: { helmet?: HelmetServerState }
}
