import { cache } from 'react'

type User = {
	id: number
	name: string
	username: string
	email: string
	address: {
		street: string
		city: string
	}
	company: {
		name: string
	}
}

const fetchUser = cache(async (userId: number): Promise<User> => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
	if (!response.ok) {
		throw new Error('Failed to fetch user')
	}
	return response.json()
})

interface UserProfileProps {
	userId: number
}

// Server Component for user profiles
export async function UserProfile({ userId }: UserProfileProps) {
	const user = await fetchUser(userId)
	
	return (
		<div style={{ 
			border: '1px solid #ddd', 
			padding: '1rem', 
			borderRadius: '8px',
			margin: '1rem 0'
		}}>
			<h4>Server-Rendered User Profile</h4>
			<p style={{ color: '#666', fontSize: '0.9em' }}>
				✅ User data fetched on the server!
			</p>
			<div>
				<strong>{user.name}</strong> (@{user.username})
			</div>
			<div style={{ color: '#666' }}>
				📧 {user.email}
			</div>
			<div style={{ color: '#666' }}>
				🏠 {user.address.street}, {user.address.city}
			</div>
			<div style={{ color: '#666' }}>
				🏢 {user.company.name}
			</div>
		</div>
	)
}