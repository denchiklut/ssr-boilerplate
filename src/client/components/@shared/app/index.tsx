import { Routes, Route } from 'react-router-dom'
import { Layout } from '@shared/layout'
import { loadable } from 'client/utils'

const HomePage = loadable(() => import('pages/home'))
const AboutPage = loadable(() => import('pages/about'))

export const App = () => (
	<Routes>
		<Route path='/' element={<Layout />}>
			<Route index element={<HomePage />} />
			<Route path='about' element={<AboutPage />} />
		</Route>
	</Routes>
)
