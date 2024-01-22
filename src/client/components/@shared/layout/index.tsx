import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Toolbar } from '@mui/material'
import { ErrorBoundary } from 'react-error-boundary'
import { Fallback } from '@shared/error'
import { Loader } from '@shared/loader'
import { usePWA } from 'client/utils'
import { AppDrawer } from './drawer'

export const Layout = () => {
	usePWA()

	return (
		<>
			<AppDrawer />

			<Box component='main' sx={{ p: 3 }}>
				<Toolbar />

				<ErrorBoundary fallback={<Fallback />}>
					<Suspense fallback={<Loader />}>
						<Outlet />
					</Suspense>
				</ErrorBoundary>
			</Box>
		</>
	)
}
