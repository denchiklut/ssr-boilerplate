import type { NextFunction, Request, Response } from 'express'
import { basename } from 'src/common'

export const pwa = (_: Request, res: Response, next: NextFunction) => {
	res.set('Service-Worker-Allowed', basename)

	next()
}
