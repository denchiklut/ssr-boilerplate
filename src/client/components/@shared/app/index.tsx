import { Suspense } from 'react'
import loadable from '@loadable/component'
import { Routes, Route } from 'react-router-dom'
import { Loader } from '@shared/loader'

const HomePage = loadable(() => import('pages/home'))
const AboutPage = loadable(() => import('pages/about'))

export const App = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route index element={<HomePage />} />
			<Route path='/about' element={<AboutPage />} />
		</Routes>
	</Suspense>
)
