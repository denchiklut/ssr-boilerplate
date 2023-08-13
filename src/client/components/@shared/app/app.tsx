import type { FC, ReactNode } from 'react'
import { getENV } from 'src/common'

interface Props {
	children: ReactNode
}
export const App: FC<Props> = ({ children }) => {
	__webpack_public_path__ = getENV('PUBLIC_PATH')

	return <>{children}</>
}
