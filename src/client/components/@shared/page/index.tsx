import type { FC, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'

interface Props {
	title: string
	url?: string
	image?: string
	description?: string
	children: ReactNode
}
export const Page: FC<Props> = ({ children, url, image, title, description }) => (
	<>
		<Helmet>
			<title>{title}</title>
			<meta property='og:title' content={title} />
			{description && <meta property='og:description' content={description} />}
			{url && <meta property='og:url' content={url} />}
			{image && <meta property='og:image' content={image} />}
		</Helmet>

		{children}
	</>
)
