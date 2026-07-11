import type { LinkHTMLAttributes, ReactNode } from 'react'

export interface AppProps {
	nonce?: string
	cookie?: string
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
	children?: ReactNode
}
