import { Suspense } from 'react'
import { Link, Outlet } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary'
import { Fallback } from '@shared/error'
import { Loader } from '@shared/loader'
import { usePWA } from 'utils/pwa'

export const Layout = () => {
	usePWA()

	return (
		<>
			<nav>
				<Link to='/'>Home</Link> / <Link to='/about'>About</Link>
			</nav>

			<ErrorBoundary fallback={<Fallback />}>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			</ErrorBoundary>
		</>
	)
}
