import { EnvironmentPlugin } from 'webpack'
import { isDev } from '../utils/env'

const config = {
    DEBUG: isDev ? 'APP-NAME:*' : false
}

export const environmentPlugin = new EnvironmentPlugin(config)
