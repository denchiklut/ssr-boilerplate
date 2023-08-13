import { useEffect } from 'react'
import { registerSW } from './pwa.util'

export const usePWA = () => {
	useEffect(() => {
		if (IS_DEV) return

		const prompt = () =>
			new Promise<boolean>(resolve => {
				// in production replace confirm with a modal or toast
				const accept = window.confirm('New version is available. Reload?')
				resolve(accept)
			})

		registerSW(prompt)
	}, [])
}
