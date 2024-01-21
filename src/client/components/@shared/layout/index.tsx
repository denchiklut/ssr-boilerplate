import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Menu } from '@mui/icons-material'
import { ErrorBoundary } from 'react-error-boundary'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { Fallback } from '@shared/error'
import { Loader } from '@shared/loader'
import { usePWA } from 'utils/pwa'

export const Layout = () => {
	usePWA()

	return (
		<>
			<AppBar component='nav'>
				<Toolbar>
					<IconButton color='inherit' edge='start' sx={{ mr: 2 }}>
						<Menu />
					</IconButton>

					<Box>
						<Link to='/'>Home</Link>
						<Link to='/about'>About</Link>
					</Box>
				</Toolbar>
			</AppBar>

			<Box component='main' sx={{ mt: 7, p: 3 }}>
				<ErrorBoundary fallback={<Fallback />}>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</ErrorBoundary>
			</Box>
		</>
	)
}
