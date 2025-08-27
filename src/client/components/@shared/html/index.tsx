import type { FC, ReactNode } from 'react'
import { basePath } from '../../../../common'

interface Props {
	nonce: string
	css: string[]
	children: ReactNode
}
export const Html: FC<Props> = ({ nonce, css, children }) => {
	if (IS_SPA) return <>{children}</>

	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				{css.map(href => (
					<link key={href} rel='stylesheet' href={href} />
				))}
				{!IS_DEV && <link nonce={nonce} rel='manifest' href={basePath('manifest.json')} />}
			</head>

			<body>{children}</body>
		</html>
	)
}
