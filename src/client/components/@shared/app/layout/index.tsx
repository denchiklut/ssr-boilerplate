import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { HydrationBoundary } from '@tanstack/react-query'
import { useDehydratedState } from 'use-dehydrated-state'
import { Loader } from '@shared/loader'
import { useLayout } from './layout.hook'

export const Layout = () => {
	const dehydratedState = useDehydratedState()
	useLayout()

	return (
		<HydrationBoundary state={dehydratedState}>
			<nav>
				<Link to='/'>Home</Link> / <Link to='/about'>About</Link>
			</nav>

			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>

			<ScrollRestoration />
		</HydrationBoundary>
	)
}
