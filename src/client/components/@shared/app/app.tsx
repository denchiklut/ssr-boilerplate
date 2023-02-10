import type { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}
export const App: FC<Props> = ({ children }) => {
	return <>{children}</>
}
