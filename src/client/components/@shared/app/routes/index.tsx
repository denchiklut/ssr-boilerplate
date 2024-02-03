import { RouteObject, json } from 'react-router'
import { Fallback } from '@shared/error'
import { loadable } from 'client/utils'
import { Layout } from '../layout'
import { fetchPosts } from 'client/api'
import { dehydrate, QueryClient } from '@tanstack/react-query'

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
				loader: async () => {
					const queryClient = new QueryClient()
					await queryClient.prefetchQuery({
						queryKey: ['posts'],
						queryFn: fetchPosts
					})

					return json({ dehydratedState: dehydrate(queryClient) })
				},
				element: <Home />
			},
			{ path: 'about', element: <About /> },
			{ path: '*', element: <NotFound /> }
		]
	}
]
