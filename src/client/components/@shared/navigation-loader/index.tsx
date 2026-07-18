'use client'

import type { ReactNode } from 'react'
import { useNavigation } from 'react-router'

import { Loader } from '@/shared/loader'

interface Props {
	children: ReactNode
}

export const NavigationLoader = ({ children }: Props) => {
	const navigation = useNavigation()

	if (navigation.state !== 'idle') return <Loader />

	return children
}
