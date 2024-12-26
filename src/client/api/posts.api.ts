export type PostsResponse = Array<{ id: number; title: string }>

export function fetchPosts(): Promise<PostsResponse> {
	return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
}
