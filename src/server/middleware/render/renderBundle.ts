import { NextFunction, Request, Response } from 'express'
import getHtml from './getHtml'

export default (req: Request, res: Response, next: NextFunction) => {
    res.renderBundle = () => {
        const location = req.url
        const { html } = getHtml(location)

        res.send(html)
    }

    next()
}
