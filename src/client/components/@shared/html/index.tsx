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
			</head>

			<body>{children}</body>
		</html>
	)
}
