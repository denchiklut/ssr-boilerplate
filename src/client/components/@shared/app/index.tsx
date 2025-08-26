import { type FC, lazy, StrictMode } from 'react'
import { Route, Routes } from 'react-router'
import { CookiesProvider } from 'react-cookie'
import type { AppProps } from '../../../../common/types'
import { Layout } from '../layout'
import { Html } from '../html'

// @ts-ignore
const Home = lazy(() => import('../../../pages/home'))
// @ts-ignore
const About = lazy(() => import('../../../pages/about'))
// @ts-ignore
const NotFound = lazy(() => import('../../../pages/not-found'))

export const App: FC<AppProps> = ({ nonce, cookies }) => {
	return (
		<StrictMode>
			<CookiesProvider cookies={cookies}>
				<Html nonce={nonce}>
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
