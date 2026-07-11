'use client'

import { type FC, type ReactNode, useState } from 'react'
import { CookiesProvider } from 'react-cookie'
import Cookies from 'universal-cookie'

import { QueryProvider } from '../query'

interface Props {
	children: ReactNode
	cookie?: Nullable<string>
}

export const Providers: FC<Props> = ({ children, cookie }) => {
	const [cookies] = useState(() => new Cookies(IS_SERVER ? cookie : undefined))

	return (
		<CookiesProvider cookies={cookies}>
			<QueryProvider>{children}</QueryProvider>
		</CookiesProvider>
	)
}
