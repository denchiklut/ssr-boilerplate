import { usePosts } from 'client/api'

export const Posts = () => {
	const { isLoading, data, error } = usePosts()

	if (isLoading) return <div>Loading posts...</div>
	if (error) return <div>Error loading posts: {error.message}</div>
	if (!data || !data.length) return <p>No data</p>

	return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>
}
