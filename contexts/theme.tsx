import { createContext, ReactNode, useContext } from 'react'

export type UpdateThemeFn = (themeName: string) => void

export interface IThemeContext {
  theme: string
  updateTheme: UpdateThemeFn
}

export const INITIAL_THEME: IThemeContext = {
  theme: 'junoLight',
  updateTheme: (themeName: string) => {
    console.error(`do-nothing update for ${themeName}`)
  },
}

export const ThemeContext = createContext<IThemeContext>(INITIAL_THEME)

export function ThemeProvider({
  children,
  theme,
  updateTheme,
}: {
  children: ReactNode
  theme: string
  updateTheme: UpdateThemeFn
}) {
  let value = { ...INITIAL_THEME, theme, updateTheme }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  return useContext(ThemeContext)
}
