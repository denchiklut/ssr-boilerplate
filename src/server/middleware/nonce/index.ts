import type { NextFunction, Request, Response } from 'express'
import { v4 } from 'uuid'

export const nonce = (req: Request, _: Response, next: NextFunction) => {
	req.nonce = v4()
	next()
}
