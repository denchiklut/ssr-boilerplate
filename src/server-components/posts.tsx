import { cache } from 'react'

export type PostsResponse = Array<{ id: number; title: string; body: string; userId: number }>

// Server-side data fetching with cache
const fetchPosts = cache(async (): Promise<PostsResponse> => {
	// This runs on the server only
	const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
	if (!response.ok) {
		throw new Error('Failed to fetch posts')
	}
	return response.json()
})

// Server Component - runs on the server
export async function Posts() {
	const posts = await fetchPosts()
	
	return (
		<div>
			<h3>Server-Rendered Posts</h3>
			<p style={{ color: '#666', fontSize: '0.9em' }}>
				✅ This data was fetched on the server!
			</p>
			<ul>
				{posts.map(post => (
					<li key={post.id} style={{ marginBottom: '1rem' }}>
						<strong>{post.title}</strong>
						<p style={{ margin: '0.5rem 0', color: '#555' }}>{post.body}</p>
						<small style={{ color: '#888' }}>User ID: {post.userId}</small>
					</li>
				))}
			</ul>
		</div>
	)
}