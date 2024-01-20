import { FC, StrictMode } from 'react'
import { lazy } from '@loadable/component'
import { CacheProvider } from '@emotion/react'
import { Route, Routes } from 'react-router-dom'
import { type AppProps, getENV } from 'src/common'
import { ThemeProvider } from 'client/utils'
import { Layout } from '@shared/layout'
import { Html } from '@shared/html'

const Home = lazy(() => import('pages/home'))
const About = lazy(() => import('pages/about'))
const NotFound = lazy(() => import('pages/not-found'))

export const App: FC<AppProps> = ({ nonce, chunkExtractor, emotionCache }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('PUBLIC_PATH')

	return (
		<StrictMode>
			<Html nonce={nonce} chunkExtractor={chunkExtractor}>
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
