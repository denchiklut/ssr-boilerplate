import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Link } from 'react-router-dom'
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
