import { Suspense } from 'react'

import { getENV, logger } from '@/common'

import { CookieDemo } from './cookie-demo'
import { Posts } from './posts'
import { State } from './state'
import css from './styles.scss'

export const Home = () => {
	const host = getENV('CLIENT_HOST')
	logger.info('Env host: %s', host)

	return (
		<div>
			<h3 className={css.wrapper}>Home page!</h3>
			<State />
			<hr />
			<CookieDemo />
			<hr />
			<Suspense fallback={<p>fetching posts...</p>}>
				<Posts />
			</Suspense>
		</div>
	)
}
