import { fetchPosts } from '@/api'
import { renderLock, setHeader } from '@/server/request'

export async function Posts() {
	// This component streams inside <Suspense>, so headers would normally be gone
	// by the time the fetch resolves — the lock holds the flush open so a header
	// derived from the fetched data still makes it out (docs/response.md §3.4).
	const posts = await renderLock(async () => {
		const posts = await fetchPosts()
		setHeader('X-Posts-Total', String(posts.length))

		return posts
	})

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
