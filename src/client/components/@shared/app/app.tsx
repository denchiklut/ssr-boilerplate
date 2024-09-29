import { type FC, StrictMode } from 'react'
import { getENV, type AppProps } from 'src/common'
import { HelmetProvider } from 'react-helmet-async'
import { ClientProvider } from 'client/utils'

export const App: FC<AppProps> = ({ client, children, nonce, helmetContext }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('CLIENT_PUBLIC_PATH')

	return (
		<StrictMode>
			<HelmetProvider context={helmetContext}>
				<ClientProvider client={client}>{children}</ClientProvider>
			</HelmetProvider>
		</StrictMode>
	)
}
