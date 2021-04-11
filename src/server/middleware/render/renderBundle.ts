import { NextFunction, Request, Response } from 'express'

import getHtml from './getHtml'

export default (req: Request, res: Response, next: NextFunction) => {
    res.renderBundle = () => {
        const location = req.url
        const { html, redirectUrl } = getHtml(location, {})

        if (redirectUrl) return res.redirect(redirectUrl)

        res.send(html)
    }

    next()
}
