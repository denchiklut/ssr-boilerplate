import { Request, Response } from 'express'

export function renderApp(req: Request, res: Response) {
    res.renderBundle()
}
