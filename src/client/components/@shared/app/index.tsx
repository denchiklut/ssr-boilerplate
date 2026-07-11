import type { LinkHTMLAttributes } from 'react'
import { createContext, type unstable_RSCRouteConfig as RSCRouteConfig } from 'react-router'

import { Html } from '../html'
import './global.scss'

export interface RenderMeta {
	nonce?: string
	cookie?: string
	linkTags?: LinkHTMLAttributes<HTMLLinkElement>[]
}

export const renderContext = createContext<RenderMeta>({})

export const routes = (): RSCRouteConfig => [
	{
		id: 'root',
		loader: ({ context }) => context.get(renderContext),
		Component({ loaderData }: { loaderData: RenderMeta }) {
			return (
				<Html
					nonce={loaderData.nonce}
					linkTags={loaderData.linkTags}
					cookie={loaderData.cookie}
				/>
			)
		},
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
