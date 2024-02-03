import type { FC } from 'react'
import { type AppProps, getENV } from 'src/common'
import { ClientProvider, usePWA } from 'client/utils'

export const App: FC<AppProps> = ({ client, children }) => {
	__webpack_public_path__ = getENV('PUBLIC_PATH')
	usePWA()

	return <ClientProvider client={client}>{children}</ClientProvider>
}
