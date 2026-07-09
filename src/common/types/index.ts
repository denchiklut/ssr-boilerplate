import type { LinkHTMLAttributes, ReactNode } from 'react'

export interface AppProps {
	nonce?: string
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
	children?: ReactNode
}
