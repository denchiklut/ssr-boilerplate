import type { FC } from 'react'
import { Outlet } from 'react-router'

import { type AppProps, basePath, publicPath } from '@/common'
import { Providers } from '@/shared/app/providers'

export const Html: FC<AppProps> = ({ nonce, linkTags, cookie }) => {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' type='image/x-icon' href={publicPath('/icons/favicon.ico')} />
				<link rel='apple-touch-icon' href={publicPath('/icons/maskable.png')} />
				{linkTags?.map((link, index) => (
					<link key={index} {...link} />
				))}
				{IS_PROD && <link nonce={nonce} rel='manifest' href={basePath('manifest.json')} />}
			</head>

			<body>
				<Providers cookie={cookie}>
					<Outlet />
				</Providers>
			</body>
		</html>
	)
}
