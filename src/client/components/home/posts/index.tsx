import { use } from 'react'
import { fetchPosts } from 'client/api'

const data = fetchPosts()

export const Posts = () => {
	const posts = use(data)

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
