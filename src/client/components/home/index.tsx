import { Suspense } from 'react'
import { Paper, Typography } from '@mui/material'
import { logger, getENV } from 'src/common'
import { Posts } from './posts'
import { State } from './state'

export const Home = () => {
	const host = getENV('HOST')
	logger.info('Env host: %s', host)

	return (
		<Paper sx={{ p: 2 }}>
			<Typography>Home page!</Typography>
			<State />

			<Suspense fallback={<p>fetching posts...</p>}>
				<Posts />
			</Suspense>
		</Paper>
	)
}
