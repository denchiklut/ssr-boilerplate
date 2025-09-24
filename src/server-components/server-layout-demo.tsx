import type { ReactNode } from 'react'

interface ServerLayoutDemoProps {
	children?: ReactNode
	title?: string
}

export async function ServerLayoutDemo({ children, title = 'Server Components Demo' }: ServerLayoutDemoProps) {
	// Server-side timestamp
	const serverTime = new Date().toISOString()
	
	return (
		<div>
			<header style={{ 
				background: '#f0f8ff', 
				padding: '1rem', 
				marginBottom: '1rem',
				borderRadius: '8px'
			}}>
				<h4 style={{ margin: 0 }}>🚀 {title}</h4>
				<p style={{ margin: '0.5rem 0 0 0', color: '#666', fontSize: '0.9em' }}>
					✅ Server-rendered at: {serverTime}
				</p>
			</header>
			<main style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
				{children || (
					<div>
						<p>This layout component was rendered on the server!</p>
						<p style={{ color: '#666', fontSize: '0.9em' }}>
							Every time you refresh or reload this component, you'll see a new timestamp above.
						</p>
					</div>
				)}
			</main>
		</div>
	)
}