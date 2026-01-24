import { useSuspenseQuery } from '@tanstack/react-query'

import { fetchPosts, postsQueryKey } from '@/api'

export const Posts = () => {
	// useSuspenseQuery will:
	// - On server: suspend and fetch data, React streams HTML once resolved
	// - On client: hydrate from dehydrated state or fetch if not available
	const { data: posts } = useSuspenseQuery({
		queryKey: postsQueryKey,
		queryFn: fetchPosts
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
