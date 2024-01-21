import type { FC, ReactNode } from 'react'

interface Props {
	nonce: string
	children: ReactNode
}
export const Html: FC<Props> = ({ children }) => {
	if (IS_SPA) return <>{children}</>

	return (
		<html>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<title>SSR app</title>
			</head>

			<body>{children}</body>
		</html>
	)
}
