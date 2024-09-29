import { useLoaderData } from 'react-router'
import type { PostsResponse } from 'client/api'

export const Posts = () => {
	const posts = useLoaderData() as PostsResponse

	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	)
}
