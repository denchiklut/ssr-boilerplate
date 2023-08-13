import { getENV } from '../index'

export const basename = new URL(getENV('HOST')).pathname

export const publicPath = (p: string) => joinPath(getENV('PUBLIC_PATH'), p)

export const basePath = (path: string) => joinPath(basename, path)

export const joinPath = (...paths: string[]) =>
	paths.reduce((res, path) => {
		if (!res) return path
		if (!path) return res

		res = res.endsWith('/') ? res.slice(0, -1) : res
		path = path.startsWith('/') ? path.slice(1) : path

		return `${res}/${path}`
	}, '')
