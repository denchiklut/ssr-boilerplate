import React from 'react'
import { resolve } from 'path'
import { DeepPartial } from '@reduxjs/toolkit'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { StaticRouterContext } from 'react-router'
import { Provider } from 'react-redux'
import { ChunkExtractor } from '@loadable/server'
import Helmet, { HelmetData } from 'react-helmet'

import App from '@shared/app'
import { createSore } from 'client/store'
import { RootState } from 'store/rootReducer'

export default function (location: string, initialState: DeepPartial<RootState>) {
    const context: StaticRouterContext = {}
    const { store } = createSore(initialState, location)

    const statsFile = resolve('./dist/loadable-stats.json')
    const chunkExtractor = new ChunkExtractor({ statsFile })

    const jsx = chunkExtractor.collectChunks(
        <Provider store={store}>
            <StaticRouter context={context} location={location}>
                <App />
            </StaticRouter>
        </Provider>
    )

    const reactHtml = renderToString(jsx)
    const reduxState = store.getState()
    const helmetData = Helmet.renderStatic()

    if (context.url) return { redirectUrl: context.url }

    return { html: getHtml(reactHtml, reduxState, helmetData, chunkExtractor) }
}

function getHtml(reactHtml: string, reduxState = {}, helmetData: HelmetData, chunkExtractor: ChunkExtractor) {
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
            ${IS_DEV ? '' : <link rel='manifest' href='manifest.json' />}
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            ${linkTags}
            ${styleTags}
        </head>
        <body>
            <div id='root'>${reactHtml}</div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            ${scriptTags}
        </body>
        </html>
    `
}
