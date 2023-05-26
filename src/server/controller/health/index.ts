import type { Request, Response } from 'express'

export const healthcheck = (_: Request, res: Response) => {
	res.sendStatus(200)
}
