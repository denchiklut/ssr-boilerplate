import { Link, Outlet } from 'react-router'

import { NavigationLoader } from '@/shared/navigation-loader'

export default async function Layout() {
	return (
		<>
			<nav>
				<Link to='/'>Home</Link> / <Link to='/about'>About</Link> /{' '}
				<Link to='/private'>Private</Link> /{' '}
				<Link to='/private-client'>Private (client)</Link>
			</nav>

			<NavigationLoader>
				<Outlet />
			</NavigationLoader>
		</>
	)
}
