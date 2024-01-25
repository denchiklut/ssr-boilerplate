import { createContext } from 'react'
import type { Theme, PaletteMode } from '@mui/material'

export interface ThemeCtx {
	mode: PaletteMode
	theme: Theme
	toggleMode: (mode?: PaletteMode) => void
}
export const ThemeContext = createContext<Nullable<ThemeCtx>>(null)
