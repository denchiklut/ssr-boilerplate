import type { ReactNode } from 'react'

interface ServerLayoutProps {
	children: ReactNode
	title?: string
}

// Server Component for layout that can do server-side work
export async function ServerLayout({ children, title = 'Server Components Demo' }: ServerLayoutProps) {
	// This could fetch navigation data, user permissions, etc. on the server
	const serverTime = new Date().toISOString()
	
	return (
		<div>
			<header style={{ 
				background: '#f0f8ff', 
				padding: '1rem', 
				marginBottom: '2rem',
				borderRadius: '8px'
			}}>
				<h2 style={{ margin: 0 }}>🚀 {title}</h2>
				<p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9em' }}>
					✅ Server-rendered at: {serverTime}
				</p>
			</header>
			<main>
				{children}
			</main>
		</div>
	)
}