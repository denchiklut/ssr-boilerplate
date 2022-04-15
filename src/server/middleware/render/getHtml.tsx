import React from 'react'
import { resolve } from 'path'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { ChunkExtractor } from '@loadable/server'

import App from '@shared/app'

export default function (location: string) {
    const statsFile = resolve('./dist/loadable-stats.json')
    const chunkExtractor = new ChunkExtractor({ statsFile })

    const jsx = chunkExtractor.collectChunks(
        <StaticRouter location={location}>
            <App />
        </StaticRouter>
    )

    const reactHtml = renderToString(jsx)

    return { html: getHtml(reactHtml, chunkExtractor) }
}

function getHtml(reactHtml: string, chunkExtractor: ChunkExtractor) {
    const scriptTags = chunkExtractor.getScriptTags()
    const linkTags = chunkExtractor.getLinkTags()
    const styleTags = chunkExtractor.getStyleTags()

    return `
        <!DOCTYPE html>
        <html lang='ru'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <meta http-equiv='X-UA-Compatible' content='ie=edge'>
            <meta name='theme-color' content='#53b374'>
            <link rel='apple-touch-icon' href='icons/favicon.png'/>
            ${linkTags}
            ${styleTags}
        </head>
        <body>
            <div id='root'>${reactHtml}</div>
            ${scriptTags}
        </body>
        </html>
    `
}
