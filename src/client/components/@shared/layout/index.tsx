import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

export const Layout = () => (
	<>
		<nav>
			<Link to='/'>Home</Link> /<Link to='/about'>About</Link>
		</nav>

		<Outlet />
	</>
)
