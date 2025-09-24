// Simple user profile server component
interface UserProfileDemoProps {
	userId?: number
}

export async function UserProfileDemo({ userId = 1 }: UserProfileDemoProps) {
	// Mock user data
	const users = {
		1: { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com", address: { street: "123 Main St", city: "New York" }, company: { name: "Tech Corp" } },
		2: { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com", address: { street: "456 Oak Ave", city: "Los Angeles" }, company: { name: "Design Co" } }
	}
	
	const user = users[userId as keyof typeof users] || users[1]
	
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