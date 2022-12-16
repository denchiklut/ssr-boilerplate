import { resolve } from 'path'
import serveFavicon from 'serve-favicon'

export const favicon = () => {
	const favPath = IS_DEV ? 'assets/icons' : 'dist/icons'
	return serveFavicon(resolve(favPath, 'favicon.ico'))
}
