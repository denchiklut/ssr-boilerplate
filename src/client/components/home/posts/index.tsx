import { fetchSomeData } from './posts.api'

const resource = fetchSomeData()
export const Posts = () => {
	const posts = resource.read()

	return (
		<ul>
			{posts.map(post => (
				<li key={post.id}>{post.text}</li>
			))}
		</ul>
	)
}
