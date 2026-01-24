import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { getENV, logger } from '@/common'

import { CookieDemo } from './cookie-demo'
import { Demo } from './demo'
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
			<Demo />
			<hr />
			<ErrorBoundary fallback={<p>failed to fetch posts</p>}>
				<Suspense fallback={<p>fetching posts...</p>}>
					<Posts />
				</Suspense>
			</ErrorBoundary>
		</div>
	)
}
