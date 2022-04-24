import { createContext, ReactNode, useContext } from 'react'

export type UpdateThemeFn = (themeName: Theme) => void
export type SetAccentColorFn = (accentColor: string | undefined) => void

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface IThemeContext {
  theme: Theme
  updateTheme: UpdateThemeFn
  accentColor?: string
  setAccentColor: SetAccentColorFn
}

export const DEFAULT_THEME_NAME = Theme.Dark

export const DEFAULT_THEME: IThemeContext = {
  theme: DEFAULT_THEME_NAME,
  updateTheme: (themeName: string) => {
    console.error(`do-nothing update for ${themeName}`)
  },
  setAccentColor: (accentColor: string | undefined) => {
    console.error(`do-nothing update for ${accentColor}`)
  },
}

export const ThemeContext = createContext<IThemeContext>(DEFAULT_THEME)

export function ThemeProvider({
  children,
  theme,
  updateTheme,
  accentColor,
  setAccentColor,
}: {
  children: ReactNode
  theme: Theme
  updateTheme: UpdateThemeFn
  accentColor?: string
  setAccentColor: SetAccentColorFn
}) {
  let value = {
    ...DEFAULT_THEME,
    theme,
    updateTheme,
    accentColor,
    setAccentColor,
  }
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => useContext(ThemeContext)
