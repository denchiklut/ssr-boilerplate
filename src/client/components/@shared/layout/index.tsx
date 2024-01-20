import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Loader } from '@shared/loader'
import { Fallback } from '@shared/error'
import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import { Menu } from '@mui/icons-material'

export const Layout = () => (
	<>
		<AppBar component='nav'>
			<Toolbar>
				<IconButton color='inherit' edge='start' sx={{ mr: 2, display: { sm: 'none' } }}>
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
