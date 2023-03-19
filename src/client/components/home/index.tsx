import { Suspense } from 'react'
import { getDebugger, getEnvVars } from 'src/common'
import { Posts } from './posts'
import { State } from './state'
import css from './styles.scss'

const debug = getDebugger('component:Home')
export const Home = () => {
	const exampleHost = getEnvVars('EXAMPLE_HOST')
	debug('example host: %s', exampleHost)

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
