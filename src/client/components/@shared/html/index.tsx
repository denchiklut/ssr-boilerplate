import { Outlet } from 'react-router'

import { basePath, publicPath } from '@/common'
import { request } from '@/server/request'
import { Providers } from '@/shared/app/providers'

export async function Html() {
	const { linkTags, headers, nonce } = await request()

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
				<Providers cookie={headers.get('cookie')}>
					<Outlet />
				</Providers>
			</body>
		</html>
	)
}
