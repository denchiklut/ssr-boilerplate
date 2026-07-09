'use client'

import { type FC, type ReactNode, useState } from 'react'
import { CookiesProvider } from 'react-cookie'
import Cookies from 'universal-cookie'

import { QueryProvider } from '../query'

interface Props {
	children: ReactNode
	cookie?: string
}

export const Providers: FC<Props> = ({ children, cookie }) => {
	// In the browser Cookies reads document.cookie; during SSR it parses the request header
	const [cookies] = useState(
		() => new Cookies(typeof document === 'undefined' ? cookie : undefined)
	)

	return (
		<CookiesProvider cookies={cookies}>
			<QueryProvider>{children}</QueryProvider>
		</CookiesProvider>
	)
}
