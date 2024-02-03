import { fetchPosts } from 'client/api'
import { useQuery } from '@tanstack/react-query'

export const Posts = () => {
	const { isLoading, data, error } = useQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts
	})

	if (isLoading) return <div>Loading posts...</div>

	if (error) return <div>Error loading posts: {error.message}</div>

	return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>
}
