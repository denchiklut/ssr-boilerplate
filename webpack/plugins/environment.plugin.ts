import { EnvironmentPlugin } from 'webpack'
import { IS_DEV } from '../env'

const config = {
    DEBUG: IS_DEV ? 'APP-NAME:*' : false
}

export const environmentPlugin = new EnvironmentPlugin(config)
