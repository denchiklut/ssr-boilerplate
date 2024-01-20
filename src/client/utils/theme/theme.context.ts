import type { Theme } from '@mui/material'
import type { ThemeCtx } from './theme.types'
import { createContext } from 'react'

export const ThemeContext = createContext<ThemeCtx>({
	themeName: 'light',
	theme: {} as Theme,
	setTheme: () => ''
})
