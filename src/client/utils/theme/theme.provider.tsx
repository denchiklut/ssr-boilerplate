import type { FC, ReactNode } from 'react'
import { CssBaseline, type PaletteMode } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { useThemeBuilder } from './theme.hooks'
import { ThemeContext } from './theme.context'

interface Props {
	mode?: PaletteMode
	children: ReactNode
}
export const ThemeProvider: FC<Props> = ({ mode = 'dark', children }) => {
	const themeCtx = useThemeBuilder(mode)

	return (
		<ThemeContext.Provider value={themeCtx}>
			<MuiThemeProvider theme={themeCtx.theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	)
}
