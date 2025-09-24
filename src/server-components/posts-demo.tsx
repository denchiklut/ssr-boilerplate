// Simple server component for demonstration
export async function Posts() {
	// Mock data instead of fetching from API
	const posts = [
		{ id: 1, title: "Introduction to React Server Components", body: "Learn about the new React Server Components feature and how it can improve your app performance." },
		{ id: 2, title: "Server-Side Data Fetching", body: "Discover how to fetch data on the server with React Server Components." },
		{ id: 3, title: "Building Faster Web Apps", body: "Explore techniques for building faster, more efficient web applications." }
	]
	
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
						<small style={{ color: '#888' }}>Post ID: {post.id}</small>
					</li>
				))}
			</ul>
		</div>
	)
}