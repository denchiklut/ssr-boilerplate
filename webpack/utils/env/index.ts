import { join } from 'path'
import { workspaceRoot } from './env.utils'

export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const PUBLIC_PATH = IS_DEV ? '/' : process.env.PUBLIC_PATH ?? '/'
export const ROOT_DIR = workspaceRoot
export const SRC_DIR = join(ROOT_DIR, 'src')
export const DIST_DIR = join(ROOT_DIR, 'dist')
