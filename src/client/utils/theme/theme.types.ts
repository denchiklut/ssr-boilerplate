import type { Theme } from '@mui/material'

export type ThemeName = 'dark' | 'light'

export interface ThemeCtx {
	themeName: ThemeName
	theme: Theme
	setTheme: (theme: ThemeName) => void
}
