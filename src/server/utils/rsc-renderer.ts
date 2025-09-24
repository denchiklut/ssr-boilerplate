import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createElement } from 'react'

interface ServerComponentRenderer {
	render(element: ReactElement): Promise<string>
	renderWithData(componentPath: string, props?: Record<string, unknown>): Promise<string>
}

class RSCRenderer implements ServerComponentRenderer {
	private serverComponents: Map<string, any> = new Map()

	constructor() {
		// Initialize server components
		this.loadServerComponents()
	}

	private async loadServerComponents() {
		try {
			// Load the working demo server components
			const { Posts } = await import('../../server-components/posts-demo')
			const { UserProfileDemo } = await import('../../server-components/user-profile-demo')
			const { ServerLayoutDemo } = await import('../../server-components/server-layout-demo')
			
			this.serverComponents.set('Posts', Posts)
			this.serverComponents.set('UserProfile', UserProfileDemo)
			this.serverComponents.set('ServerLayout', ServerLayoutDemo)
			
			console.log('Server components loaded:', Array.from(this.serverComponents.keys()))
		} catch (error) {
			console.error('Failed to load server components:', error)
		}
	}

	async render(element: ReactElement): Promise<string> {
		// This would normally use React's server rendering for RSC
		return renderToString(element)
	}

	async renderWithData(componentName: string, props: Record<string, unknown> = {}): Promise<string> {
		const Component = this.serverComponents.get(componentName)
		if (!Component) {
			throw new Error(`Server component ${componentName} not found`)
		}

		try {
			// Handle async server components
			let element: ReactElement
			const componentResult = Component(props)
			
			// Check if it's a promise (async component)
			if (componentResult && typeof componentResult.then === 'function') {
				element = await componentResult
			} else {
				element = componentResult
			}

			// If the component didn't return JSX directly, create element
			if (typeof element === 'function') {
				element = createElement(element as any, props)
			}

			return await this.render(element)
		} catch (error) {
			console.error(`Error rendering server component ${componentName}:`, error)
			throw error
		}
	}

	getAvailableComponents(): string[] {
		return Array.from(this.serverComponents.keys())
	}
}

export const rscRenderer = new RSCRenderer()