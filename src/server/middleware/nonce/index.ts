import { v4 } from 'uuid'
import type { NextFunction, Request, Response } from 'express'

export const nonce = (req: Request, _: Response, next: NextFunction) => {
	req.nonce = v4()
	next()
}
