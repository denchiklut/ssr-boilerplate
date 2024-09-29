import { useRouteError } from 'react-router'
import { logger } from 'src/common'

export const Fallback = () => {
	const error = useRouteError()
	logger.error(error)

	return <p>Something went wrong</p>
}
