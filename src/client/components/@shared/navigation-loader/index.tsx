'use client'

import type { ReactNode } from 'react'
import { useNavigation } from 'react-router'

import css from './styles.scss'

interface Props {
	children: ReactNode
}

/**
 * Marks the page busy during a navigation without unmounting it.
 *
 * Swapping the children for a loader — the obvious version — throws away the
 * current page the moment a navigation starts, so every navigation has a
 * content-less window, and anything that resolves to a redirect flashes empty on
 * the way out. Keeping the children mounted is react-router's own behaviour: the
 * pending route only replaces the current one once its payload has landed.
 */
export const NavigationLoader = ({ children }: Props) => {
	const navigation = useNavigation()

	return (
		<div className={css.wrapper} aria-busy={navigation.state !== 'idle'}>
			{children}
		</div>
	)
}
