import { Suspense } from 'react'
import { getDebugger, getENV } from 'src/common'
import { Posts } from './posts'
import { State } from './state'
import css from './styles.scss'

const debug = getDebugger('component:Home')
export const Home = () => {
	const host = getENV('HOST')
	debug('app host: %s', host)

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
