import { join } from 'path'

export const IS_DEV = process.env.NODE_ENV === 'development'
export const IS_PROD = process.env.NODE_ENV === 'production'
export const SRC_DIR = join(__dirname, '../src')
export const ROOT_DIR = join(__dirname, '../')
export const DIST_DIR = join(__dirname, '../dist')
