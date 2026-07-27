import type { unstable_RSCRouteConfig as RSCRouteConfig } from 'react-router'

import { Html } from '../html'
import './global.scss'

export const routes = (): RSCRouteConfig => [
	{
		id: 'root',
		Component: Html,
		children: [
			{
				id: 'layout',
				lazy: () => import('@/shared/layout' as string),
				children: [
					{ id: 'home', index: true, lazy: () => import('@/pages/home' as string) },
					{ id: 'about', path: 'about', lazy: () => import('@/pages/about' as string) },
					{
						id: 'private',
						path: 'private',
						lazy: () => import('@/pages/private' as string)
					},
					{
						id: 'private-client',
						path: 'private-client',
						lazy: () => import('@/pages/private-client' as string)
					},
					{
						id: 'not-found',
						path: '*',
						lazy: () => import('@/pages/not-found' as string)
					}
				]
			}
		]
	}
]
