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
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>SSR app</title>
				{links}
				{styles}
			</head>

			<body>{children}</body>
			{scripts}
		</html>
	)
}
