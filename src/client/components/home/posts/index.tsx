import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchPosts, postsQueryKey } from '@/api'

export const Posts = () => {
	const { data: posts } = useSuspenseQuery({
		queryKey: postsQueryKey,
		queryFn: fetchPosts,
		staleTime: 5 * 60 * 1000
	})

	return (
		<div>
			<b>Data fetching demo (React Query + SSR)</b>
			<ul>
				{posts.slice(0, 10).map(post => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	)
}
