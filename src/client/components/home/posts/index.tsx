import { useLoaderData } from 'react-router'
import type { PostsResponse } from 'client/api'

export const Posts = () => {
	const posts = useLoaderData() as PostsResponse

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
