import { Stats as WebpackStats } from 'webpack-dev-middleware'

export type Stats = ReturnType<WebpackStats['toJson']>
