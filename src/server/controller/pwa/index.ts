import { resolve } from 'path'
import type { Request, Response } from 'express'

export const pwa = (req: Request, res: Response) => {
	if (IS_DEV) return res.send('Service Worker not available in dev mode')
	if (['/service-worker.js', '/service-worker.js.map'].includes(req.path)) {
		return res.sendFile(resolve(__dirname, `../client/pwa/${req.path}`))
	}
	return res.sendStatus(404)
}
