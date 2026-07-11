import { fetchPosts } from '@/api'

export const Posts = async () => {
	const posts = await fetchPosts()

	return (
		<div>
			<b>Data fetching demo (React Server Component)</b>
			<ul>
				{posts.slice(0, 10).map(post => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	)
}
