import { useLoaderData } from 'react-router'
import { getDebugger } from 'common/debugger'
import { PostsResponse } from 'client/api'

const debug = getDebugger('component:Post')
export const Posts = () => {
	const posts = useLoaderData() as PostsResponse
	debug('posts: %o', posts)

	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	)
}
