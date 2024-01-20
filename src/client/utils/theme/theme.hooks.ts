import type { Theme } from '@mui/material'
import { enUS } from '@mui/material/locale'
import { createTheme } from '@mui/material/styles'
import { useContext, useMemo, useState } from 'react'

import { ThemeContext } from './theme.context'
import type { ThemeName } from './theme.types'

export const useThemeBuilder = (initial: ThemeName = 'light') => {
	const [themeName, setTheme] = useState<ThemeName>(initial)

	const theme: Theme = useMemo(() => createTheme(enUS), [themeName])

	return useMemo(() => ({ themeName, theme, setTheme }), [theme, themeName])
}

export const useTheme = () => useContext(ThemeContext)
