import { Suspense } from 'react'
import { Outlet, Link, ScrollRestoration } from 'react-router'
import { Loader } from '@shared/loader'
import { useLayout } from './layout.hook'

export const Layout = () => {
	useLayout()

	return (
		<>
			<nav>
				<Link to='/'>Home</Link> / <Link to='/about'>About</Link>
			</nav>

			<Suspense fallback={<Loader />}>
				<Outlet />
			</Suspense>

			<ScrollRestoration />
		</>
	)
}
