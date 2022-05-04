import { ChunkExtractor } from '@loadable/server'

export const getHtml = (reactHtml: string, chunkExtractor: ChunkExtractor) => {
    const scriptTags = chunkExtractor.getScriptTags()
    const linkTags = chunkExtractor.getLinkTags()
    const styleTags = chunkExtractor.getStyleTags()

    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Sneakers shop</title>
        ${linkTags}
        ${styleTags}
    </head>
    <body>
        <div id="root">${reactHtml}</div>
        ${scriptTags}
    </body>
</html>`
}

export const getApp = () => {
    const isDev = (process.env.NODE_ENV = 'development')

    if (isDev) {
        console.log('Clearing cache from server')
        Object.keys(require.cache)
            .filter(id => /\.server\.js$/.test(id))
            .forEach(id => delete require.cache[id])
    }

    return require('../../../../main.server.js')
}
