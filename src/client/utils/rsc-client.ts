interface RSCResponse {
	html: string
	component: string
	props: Record<string, unknown>
}

interface RSCComponentsResponse {
	components: string[]
}

class RSCClient {
	async renderServerComponent(component: string, props: Record<string, unknown> = {}): Promise<string> {
		try {
			const response = await fetch('/api/rsc/render', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ component, props }),
			})

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data: RSCResponse = await response.json()
			return data.html
		} catch (error) {
			console.error('Failed to render server component:', error)
			throw error
		}
	}

	async getAvailableComponents(): Promise<string[]> {
		try {
			const response = await fetch('/api/rsc/components')
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data: RSCComponentsResponse = await response.json()
			return data.components
		} catch (error) {
			console.error('Failed to get server components:', error)
			return []
		}
	}
}

export const rscClient = new RSCClient()