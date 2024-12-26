import { cache } from 'react'

export type PostsResponse = Array<{ id: string; title: string }>

export const fetchPosts = cache(() =>
	fetch('https://jsonplaceholder.typicode.com/todos').then(
		res => res.json() as Promise<PostsResponse>
	)
)
