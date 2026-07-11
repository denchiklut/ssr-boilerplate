import type { Request, Response } from 'express'

export function healthcheck(_: Request, res: Response) {
	res.sendStatus(200)
}
