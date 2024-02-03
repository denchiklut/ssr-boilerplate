import type { FC } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { type AppProps, getENV } from 'src/common'
import { usePWA } from 'client/utils'

export const App: FC<AppProps> = ({ client, children }) => {
	__webpack_public_path__ = getENV('PUBLIC_PATH')
	usePWA()

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
