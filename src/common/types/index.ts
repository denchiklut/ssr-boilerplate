import type { QueryClient } from '@tanstack/react-query'
import type { LinkHTMLAttributes, ReactNode } from 'react'
import type Cookies from 'universal-cookie'

export interface AppProps {
	nonce: string
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
	cookies?: Cookies
	children?: ReactNode
	/** QueryClient instance for SSR - passed from server to ensure same client is used for render and dehydrate */
	queryClient?: QueryClient
}
