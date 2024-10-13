import { use, useState } from 'react'
import { fetchPosts } from './posts.api'

export const Posts = () => {
	const [promise] = useState(() => fetchPosts())
	const posts = use(promise)

	return (
		<div>
			<b>Data fetching demo</b>
			<ul>
				{posts.map(post => (
					<li key={post.id}>{post.text}</li>
				))}
			</ul>
		</div>
	)
}
