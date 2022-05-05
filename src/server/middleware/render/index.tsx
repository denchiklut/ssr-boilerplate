import { NextFunction, Request, Response } from 'express'
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import requireFromString from 'require-from-string'
import { getHtml } from './render.util'
import path from 'path'

interface Stats {
    children: { name: string; assetsByChunkName: { main: string[] }; outputPath: string }[]
}

export const render = (req: Request, res: Response, next: NextFunction) => {
    const stats: Stats = res.locals.webpack.devMiddleware.stats.toJson()
    const client = stats.children.find(child => child.name === 'client')
    const server = stats.children.find(child => child.name === 'server')
    const chunkExtractor = new ChunkExtractor({ stats: client })

    function getApp() {
        const { assetsByChunkName, outputPath } = server
        const outputFileSystem = res.locals.webpack.devMiddleware.outputFileSystem
        const rendererFileName = assetsByChunkName.main.find(asset => asset.endsWith('.js'))
        return requireFromString(
            outputFileSystem.readFileSync(path.join(outputPath, rendererFileName), 'utf-8'),
            rendererFileName
        )
    }

    const { App } = getApp()

    res.renderApp = () => {
        const location = req.url
        const jsx = chunkExtractor.collectChunks(
            <StaticRouter location={location}>
                <App />
            </StaticRouter>
        )
        const reactHtml = renderToString(jsx)

        res.status(200).send(getHtml(reactHtml, chunkExtractor))
    }

    next()
}
