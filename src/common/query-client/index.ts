import { QueryClient } from '@tanstack/react-query'

export const getQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: { ...(IS_SERVER && { staleTime: 1000 * 60 * 5 }) }
		}
	})
}
