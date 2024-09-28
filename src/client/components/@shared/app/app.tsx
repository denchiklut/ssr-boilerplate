import { type FC, StrictMode } from 'react'
import { getENV, type AppProps } from 'src/common'
import { HelmetProvider } from 'react-helmet-async'

export const App: FC<AppProps> = ({ children, nonce, helmetContext }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('CLIENT_PUBLIC_PATH')

	return (
		<StrictMode>
			<HelmetProvider context={helmetContext}>{children}</HelmetProvider>
		</StrictMode>
	)
}
