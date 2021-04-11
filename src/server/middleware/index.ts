import cookieParserMiddleware from 'cookie-parser'
import corsMiddleware from 'cors'
import helmetMiddleware from 'helmet'
import compressionMiddleware from 'compression'

export const cors = corsMiddleware()
export const helmet = helmetMiddleware({ contentSecurityPolicy: false })
export const cookieParser = cookieParserMiddleware()
export const compression = compressionMiddleware()

export * from './queryParser'
export * from './render'
