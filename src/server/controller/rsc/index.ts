import type { Request, Response } from 'express'
import { rscRenderer } from '../../utils/rsc-renderer'

interface RSCRequest extends Request {
	body: {
		component: string
		props?: Record<string, unknown>
	}
}

export const renderServerComponent = async (req: RSCRequest, res: Response) => {
	try {
		const { component, props = {} } = req.body

		if (!component) {
			return res.status(400).json({ error: 'Component name is required' })
		}

		const html = await rscRenderer.renderWithData(component, props)
		
		res.json({
			html,
			component,
			props
		})
	} catch (error) {
		console.error('RSC rendering error:', error)
		res.status(500).json({ 
			error: 'Failed to render server component',
			message: error instanceof Error ? error.message : 'Unknown error'
		})
	}
}

export const getAvailableServerComponents = (_: Request, res: Response) => {
	try {
		const components = rscRenderer.getAvailableComponents()
		res.json({ components })
	} catch (error) {
		console.error('Error getting server components:', error)
		res.status(500).json({ error: 'Failed to get server components' })
	}
}