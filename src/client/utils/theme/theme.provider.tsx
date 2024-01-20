import { CssBaseline } from "@mui/material"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import type { FC, ReactNode } from "react"

import { ThemeContext } from "./theme.context"
import { useThemeBuilder } from "./theme.hooks"
import type { ThemeName } from "./theme.types"

interface Props {
	themeName?: ThemeName
	children: ReactNode
}

export const ThemeProvider: FC<Props> = ({ themeName = "light", children }) => {
	const themeCtx = useThemeBuilder(themeName)

	return (
		<ThemeContext.Provider value={themeCtx}>
			<MuiThemeProvider theme={themeCtx.theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	)
}
