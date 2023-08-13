import type { FC, ReactNode } from 'react'
import { getENV } from 'src/common'
import { usePWA } from 'client/utils'

interface Props {
	children: ReactNode
}
export const App: FC<Props> = ({ children }) => {
	usePWA()
	__webpack_public_path__ = getENV('PUBLIC_PATH')

	return <>{children}</>
}
