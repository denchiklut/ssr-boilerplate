import type { NextFunction, Request, Response } from 'express'
import { v4 } from 'uuid'

export const uuid = (req: Request, _: Response, next: NextFunction) => {
	req.nonce = v4()
	next()
}
