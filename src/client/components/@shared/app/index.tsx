import { type FC, lazy, StrictMode } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CacheProvider } from '@emotion/react'
import { type AppProps, getENV } from 'src/common'
import { Layout } from '@shared/layout'
import { ThemeProvider } from 'client/utils'
import { Html } from '@shared/html'

const Home = lazy(() => import('pages/home'))
const About = lazy(() => import('pages/about'))
const NotFound = lazy(() => import('pages/not-found'))

export const App: FC<AppProps> = ({ nonce, emotionCache }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('PUBLIC_PATH')

	return (
		<StrictMode>
			<Html nonce={nonce}>
				<CacheProvider value={emotionCache}>
					<ThemeProvider>
						<Routes>
							<Route path='/' element={<Layout />}>
								<Route index element={<Home />} />
								<Route path='about' element={<About />} />
								<Route path='*' element={<NotFound />} />
							</Route>
						</Routes>
					</ThemeProvider>
				</CacheProvider>
			</Html>
		</StrictMode>
	)
}
