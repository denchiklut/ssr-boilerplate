'use client'

import { useEffect, useState } from 'react'
import { rscClient } from '@/utils/rsc-client'

interface ServerComponentLoaderProps {
	component: string
	props?: Record<string, unknown>
	fallback?: React.ReactNode
}

export function ServerComponentLoader({ 
	component, 
	props = {}, 
	fallback = <div>Loading server component...</div> 
}: ServerComponentLoaderProps) {
	const [html, setHtml] = useState<string>('')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let mounted = true

		const loadServerComponent = async () => {
			try {
				setLoading(true)
				setError(null)
				
				const renderedHtml = await rscClient.renderServerComponent(component, props)
				
				if (mounted) {
					setHtml(renderedHtml)
					setLoading(false)
				}
			} catch (err) {
				if (mounted) {
					setError(err instanceof Error ? err.message : 'Failed to load server component')
					setLoading(false)
				}
			}
		}

		loadServerComponent()

		return () => {
			mounted = false
		}
	}, [component, JSON.stringify(props)])

	if (loading) {
		return <>{fallback}</>
	}

	if (error) {
		return (
			<div style={{ 
				color: '#dc3545', 
				padding: '1rem', 
				border: '1px solid #dc3545', 
				borderRadius: '4px',
				backgroundColor: '#f8d7da'
			}}>
				<strong>Error loading server component:</strong> {error}
			</div>
		)
	}

	return (
		<div 
			dangerouslySetInnerHTML={{ __html: html }}
			style={{ 
				border: '2px solid #28a745', 
				borderRadius: '8px', 
				padding: '1rem',
				backgroundColor: '#d4edda'
			}}
		/>
	)
}