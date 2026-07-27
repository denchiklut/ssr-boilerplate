import { fetchPosts } from '@/api'
import { response } from '@/rsc'

export async function Posts() {
	const { headers, renderLock } = response()

	// This component streams inside <Suspense>, so headers would normally be gone
	// by the time the fetch resolves — the lock holds the flush open so a header
	// derived from the fetched data still makes it out (docs/rsc.md §8.5).
	const posts = await renderLock(async () => {
		const posts = await fetchPosts()
		headers.set('X-Posts-Total', String(posts.length))

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
