import { type FC, StrictMode } from 'react'
import { CookiesProvider } from 'react-cookie'
import { HelmetProvider } from 'react-helmet-async'
import { getENV, type AppProps } from 'src/common'

export const App: FC<AppProps> = ({ children, nonce, cookies, helmetContext }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('CLIENT_PUBLIC_PATH')

	return (
		<StrictMode>
			<HelmetProvider context={helmetContext}>
				<CookiesProvider cookies={cookies}>{children}</CookiesProvider>
			</HelmetProvider>
		</StrictMode>
	)
}
