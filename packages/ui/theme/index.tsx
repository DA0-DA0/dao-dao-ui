import { createContext, FC, useContext } from 'react'

export type UpdateThemeFn = (themeName: Theme) => void
export type SetAccentColorFn = (accentColor: string | undefined) => void

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface IThemeContext {
  theme: Theme
  themeChangeCount: number
  updateTheme: UpdateThemeFn
  accentColor?: string
  setAccentColor: SetAccentColorFn
}

export const DEFAULT_THEME_NAME = Theme.Dark

export const DEFAULT_THEME: IThemeContext = {
  theme: DEFAULT_THEME_NAME,
  themeChangeCount: 0,
  updateTheme: (themeName: string) => {
    console.error(`do-nothing update for ${themeName}`)
  },
  setAccentColor: (accentColor: string | undefined) => {
    console.error(`do-nothing update for ${accentColor}`)
  },
}

export const ThemeContext = createContext<IThemeContext>(DEFAULT_THEME)

export const ThemeProvider: FC<IThemeContext> = ({
  children,
  theme,
  themeChangeCount,
  updateTheme,
  accentColor,
  setAccentColor,
}) => (
  <ThemeContext.Provider
    value={{
      ...DEFAULT_THEME,
      theme,
      themeChangeCount,
      updateTheme,
      accentColor,
      setAccentColor,
    }}
  >
    {children}
  </ThemeContext.Provider>
)

export const useThemeContext = () => useContext(ThemeContext)
