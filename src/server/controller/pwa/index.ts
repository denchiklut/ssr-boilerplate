import type { Request, Response } from 'express'
import { basename, publicPath } from 'src/common'

export const getManifest = (_: Request, res: Response) => {
	res.json({
		short_name: 'SSR app',
		name: 'SSR app',
		start_url: basename,
		display: 'standalone',
		theme_color: '#efefef',
		background_color: '#f2f4f6',
		icons: [
			{
				src: publicPath('icons/192.png'),
				sizes: '192x192'
			},
			{
				src: publicPath('icons/512.png'),
				sizes: '512x512'
			},
			{
				src: publicPath('icons/maskable.png'),
				sizes: '150x150',
				type: 'image/svg+xml',
				purpose: 'any'
			},
			{
				src: publicPath('icons/maskable.png'),
				type: 'image/svg+xml',
				purpose: 'maskable'
			}
		]
	})
}
