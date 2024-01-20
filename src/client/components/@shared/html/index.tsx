import type { FC, ReactNode } from 'react'
import type { ChunkExtractor } from '@loadable/server'

interface Props {
	nonce: string
	children: ReactNode
	chunkExtractor?: ChunkExtractor
}
export const Html: FC<Props> = ({ children, chunkExtractor }) => {
	if (IS_SPA) return <>{children}</>

	const scripts = chunkExtractor?.getScriptElements()
	const links = chunkExtractor?.getLinkElements()
	const styles = chunkExtractor?.getStyleElements()

	return (
		<html>
			<head>
				<meta charSet='utf-8' />
				<meta property='og:type' content='website' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />

				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
				/>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/icon?family=Material+Icons'
				/>

				<title>SSR app</title>
				{links}
				{styles}
			</head>

			<body>{children}</body>
			{scripts}
		</html>
	)
}
