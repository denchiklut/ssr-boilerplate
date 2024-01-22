import type { FC, ReactNode } from 'react'
import { basePath } from 'src/common'

interface Props {
	nonce: string
	children: ReactNode
}
export const Html: FC<Props> = ({ nonce, children }) => {
	if (IS_SPA) return <>{children}</>

	return (
		<html>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				{IS_PROD && <link nonce={nonce} rel='manifest' href={basePath('manifest.json')} />}
				<title>SSR app</title>
			</head>

			<body>{children}</body>
		</html>
	)
}
