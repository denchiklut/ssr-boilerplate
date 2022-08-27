import { resolve } from 'path'
import serveFavicon from 'serve-favicon'

export const favicon = () => {
	const favPath = IS_DEV ? 'src/client/assets/icons' : 'dist/icons'
	return serveFavicon(resolve(favPath, 'favicon.ico'))
}
