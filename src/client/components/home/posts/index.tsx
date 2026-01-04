import { use } from 'react'

import type { PostsResponse } from '@/src/client/api'

interface Props {
	promise: Promise<PostsResponse>
}
export const Posts = ({ promise }: Props) => {
	const posts = use(promise)

	return (
		<div>
			<b>Data fetching demo</b>
			<ul>
				{posts.map(post => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	)
}
