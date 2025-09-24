import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Link, Outlet } from 'react-router'

import { usePWA } from '@/utils'

import { Fallback } from '../error'
import { Loader } from '../loader'

export const Layout = () => {
	usePWA()

	return (
		<>
			<nav>
				<Link to='/'>Home</Link> / <Link to='/about'>About</Link> / <Link to='/server-components'>Server Components</Link>
			</nav>

			<ErrorBoundary fallback={<Fallback />}>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			</ErrorBoundary>
		</>
	)
}
