import type { QueryClient } from '@tanstack/react-query'
import type { LinkHTMLAttributes, ReactNode } from 'react'
import type Cookies from 'universal-cookie'

export interface AppProps {
	nonce: string
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
	cookies?: Cookies
	children?: ReactNode
	client: QueryClient
}
