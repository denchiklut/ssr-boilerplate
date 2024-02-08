import type { FC } from 'react'
import { getENV, type AppProps } from 'src/common'

export const App: FC<AppProps> = ({ children, nonce }) => {
	__webpack_nonce__ = nonce
	__webpack_public_path__ = getENV('PUBLIC_PATH')

	return <>{children}</>
}
