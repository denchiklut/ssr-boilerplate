import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Loader } from '@shared/loader'
import { Fallback } from '@shared/error'

export const Layout = () => (
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
