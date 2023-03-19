import { RouteObject } from 'react-router'
import { Fallback } from '@shared/error'
import { loadable } from 'client/utils'
import { Layout } from '../layout'
import { fetchPosts } from 'client/api'

const Home = loadable(() => import('pages/home'))
const About = loadable(() => import('pages/about'))
const NotFound = loadable(() => import('pages/not-found'))

export const routes: RouteObject[] = [
	{
		element: <Layout />,
		errorElement: <Fallback />,
		children: [
			{
				index: true,
				loader: async () => await fetchPosts(),
				element: <Home />
			},
			{ path: 'about', element: <About /> },
			{ path: '*', element: <NotFound /> }
		]
	}
]
