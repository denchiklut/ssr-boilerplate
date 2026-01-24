import { type FC, lazy, StrictMode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { Route, Routes } from 'react-router'

import { type AppProps, getENV } from '@/common'

import { Html } from '../html'
import { Layout } from '../layout'
import { QueryProvider } from '../query'
import './global.scss'

const Home = lazy(() => import('@/pages/home' as string))
const About = lazy(() => import('@/pages/about' as string))
const NotFound = lazy(() => import('@/pages/not-found' as string))

export const App: FC<AppProps> = ({ nonce, cookies, linkTags, queryClient }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('CLIENT_PUBLIC_PATH')

	return (
		<StrictMode>
			<QueryProvider queryClient={queryClient}>
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
			</QueryProvider>
		</StrictMode>
	)
}
