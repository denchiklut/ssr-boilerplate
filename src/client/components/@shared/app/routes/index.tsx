import { RouteObject } from 'react-router'
import { Fallback } from '@shared/error'
import { loadable } from 'client/utils'
import { Layout } from '../layout'

const Home = loadable(() => import('pages/home'))
const About = loadable(() => import('pages/about'))
const NotFound = loadable(() => import('pages/not-found'))

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		errorElement: <Fallback />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'about', element: <About /> },
			{ path: '*', element: <NotFound /> }
		]
	}
]
