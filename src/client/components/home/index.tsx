import { Suspense } from 'react'
import { logger, getENV } from 'src/common'
import { Posts } from './posts'
import { State } from './state'
import css from './styles.scss'

export const Home = () => {
	const host = getENV('HOST')
	logger.info('Env host: %s', host)

	return (
		<div className={css.wrapper}>
			<h3>Home page!</h3>
			<State />

			<Suspense fallback={<p>fetching posts...</p>}>
				<Posts />
			</Suspense>
		</div>
	)
}
