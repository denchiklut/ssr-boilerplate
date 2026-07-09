import type { LinkHTMLAttributes } from 'react'
import {
	createContext,
	Outlet,
	type RouterContextProvider,
	type unstable_RSCRouteConfig as RSCRouteConfig
} from 'react-router'

import { Html } from '../html'
import { Providers } from './providers'
import './global.scss'

export interface RenderMeta {
	nonce?: string
	cookie?: string
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
}

/** Per-request data injected by the express render middleware. */
export const renderContext = createContext<RenderMeta>({})

const Root = ({ loaderData }: { loaderData: RenderMeta }) => (
	<Html nonce={loaderData.nonce} linkTags={loaderData.linkTags}>
		<Providers cookie={loaderData.cookie}>
			<Outlet />
		</Providers>
	</Html>
)

export const routes = (): RSCRouteConfig => [
	{
		id: 'root',
		loader: ({ context }) => (context as RouterContextProvider).get(renderContext),
		Component: Root,
		children: [
			{
				id: 'layout',
				lazy: () => import('@/shared/layout' as string),
				children: [
					{ id: 'home', index: true, lazy: () => import('@/pages/home' as string) },
					{ id: 'about', path: 'about', lazy: () => import('@/pages/about' as string) },
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
