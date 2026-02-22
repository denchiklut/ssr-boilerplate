export type PostsResponse = Array<{ id: string; title: string }>

export const fetchPosts = (): Promise<PostsResponse> =>
	fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())

// Query key factory for posts
export const postsQueryKey = ['posts'] as const
