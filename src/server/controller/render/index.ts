import type { NextFunction, Request, Response } from 'express'

export const render = (_: Request, res: Response, next: NextFunction) => {
	res.renderApp().catch(next)
}
