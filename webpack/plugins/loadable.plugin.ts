import type { WebpackPluginInstance } from 'webpack'
import LoadablePlugin from '@loadable/webpack-plugin'

export const loadablePlugin = new LoadablePlugin() as WebpackPluginInstance
