import { use } from 'react'
import { fetchPosts } from './posts.api'

export const Posts = () => {
	const posts = use(fetchPosts())

	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	)
}
