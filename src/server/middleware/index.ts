import cookieParserMiddleware from 'cookie-parser'
import corsMiddleware from 'cors'
import compressionMiddleware from 'compression'

export const cors = corsMiddleware()
export const cookieParser = cookieParserMiddleware()
export const compression = compressionMiddleware()

export * from './queryParser'
export * from './render'
