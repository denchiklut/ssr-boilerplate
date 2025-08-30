import { useRouteError } from 'react-router'

import { logger } from '@/common/logger'

export const Fallback = () => {
	const error = useRouteError()
	logger.error(error)

	return <p>Something went wrong</p>
}
