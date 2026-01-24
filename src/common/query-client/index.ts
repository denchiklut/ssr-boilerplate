import { QueryClient } from '@tanstack/react-query'
import type { Request } from 'express'

export function getQueryClient(_req?: Request) {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: IS_SERVER ? false : 3,
			},
		},
	})
}
