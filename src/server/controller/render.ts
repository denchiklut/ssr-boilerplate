import { Request, Response } from 'express'

export const render = (req: Request, res: Response) => {
  res.renderApp()
}