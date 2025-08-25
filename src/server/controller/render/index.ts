import { Request, Response } from 'express'

export const render = (_: Request, res: Response) => {
	res.renderApp()
}
