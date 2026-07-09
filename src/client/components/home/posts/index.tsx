import { fetchPosts } from '@/api'

// Server component: runs only on the server, never ships to the client bundle
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
