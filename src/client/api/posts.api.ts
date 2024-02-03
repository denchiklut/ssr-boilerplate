interface Post {
	userId: number
	id: number
	title: string
	body: string
}

export type PostsResponse = Array<Post>

export async function fetchPosts(): Promise<PostsResponse> {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts')

	return await res.json()
}
