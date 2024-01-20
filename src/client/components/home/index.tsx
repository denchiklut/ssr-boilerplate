import { Suspense } from 'react'
import { logger, getENV } from 'src/common'
import { Posts } from './posts'
import { State } from './state'
import css from './styles.scss'
import { Container, Typography } from '@mui/material'

export const Home = () => {
	const host = getENV('HOST')
	logger.info('Env host: %s', host)

	return (
		<Container className={css.wrapper}>
			<Typography>Home page!</Typography>
			<State />

			<Suspense fallback={<p>fetching posts...</p>}>
				<Posts />
			</Suspense>
		</Container>
	)
}
