import { useRouteError } from 'react-router'

export const Fallback = () => {
	const error = useRouteError()
	console.error(error)

	return <p>Something went wrong</p>
}
