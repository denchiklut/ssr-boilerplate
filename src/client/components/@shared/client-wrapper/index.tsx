'use client'

import { Suspense, useState, type ReactNode } from 'react'

interface ClientWrapperProps {
	children: ReactNode
}

// Client component that provides interactivity
export function ClientWrapper({ children }: ClientWrapperProps) {
	const [showDetails, setShowDetails] = useState(true)
	
	return (
		<div>
			<div style={{ marginBottom: '1rem' }}>
				<button 
					onClick={() => setShowDetails(!showDetails)}
					style={{
						padding: '0.5rem 1rem',
						backgroundColor: '#007bff',
						color: 'white',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer'
					}}
				>
					{showDetails ? '🙈 Hide' : '👀 Show'} Server Components
				</button>
				<p style={{ color: '#666', fontSize: '0.9em', margin: '0.5rem 0' }}>
					⚡ This button works on the client!
				</p>
			</div>
			
			{showDetails && (
				<Suspense fallback={<div>Loading server components...</div>}>
					{children}
				</Suspense>
			)}
		</div>
	)
}