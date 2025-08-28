import { type FC, lazy, StrictMode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { Route, Routes } from 'react-router'
import type { AppProps } from '../../../../common/types'
import { Html } from '../html'
import { Layout } from '../layout'
import './global.scss'

// @ts-expect-error
const Home = lazy(() => import('../../../pages/home'))
// @ts-expect-error
const About = lazy(() => import('../../../pages/about'))
// @ts-expect-error
const NotFound = lazy(() => import('../../../pages/not-found'))

export const App: FC<AppProps> = ({ nonce, cookies, linkTags }) => {
	return (
		<StrictMode>
			<CookiesProvider cookies={cookies}>
				<Html nonce={nonce} linkTags={linkTags}>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Home />} />
							<Route path='about' element={<About />} />
							<Route path='*' element={<NotFound />} />
						</Route>
					</Routes>
				</Html>
			</CookiesProvider>
		</StrictMode>
	)
}
