import express from 'express'

import { queryParser, compression, cookieParser, cors, helmet } from './middleware'
import { router } from './router'

const server = express()

server
    .use(express.json())
    .use(compression)
    .use(cookieParser)
    .set('query parser', queryParser)
    .use(cors)
    .use(helmet)
    .use(router)

export { server }
