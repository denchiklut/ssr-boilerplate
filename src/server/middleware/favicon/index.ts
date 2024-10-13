import { resolve } from 'path'
import serveFavicon from 'serve-favicon'

export const favicon = () => {
	const favPath = IS_DEV ? resolve('public/icons') : resolve(__dirname, '../client/icons')
	return serveFavicon(resolve(favPath, 'favicon.ico'))
}
