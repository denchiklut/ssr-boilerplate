import type { FC, ReactNode } from 'react'

interface Props {
	title: string
	url?: string
	image?: string
	description?: string
	children: ReactNode
}
export const Page: FC<Props> = ({ children, url, image, title, description }) => (
	<>
		<title>{title}</title>
		<meta property='og:title' content={title} />
		{description && <meta property='og:description' content={description} />}
		{url && <meta property='og:url' content={url} />}
		{image && <meta property='og:image' content={image} />}

		{children}
	</>
)
