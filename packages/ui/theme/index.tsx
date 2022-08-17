import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

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

export const ThemeProvider = ({
  children,
  theme,
  themeChangeCount,
  updateTheme,
  accentColor,
  setAccentColor,
}: PropsWithChildren<IThemeContext>) => (
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

export const useNamedThemeColor = (colorName: string) => {
  const { themeChangeCount } = useThemeContext()

  const [color, setColor] = useState<string | undefined>(
    getNamedColorFromDOM(colorName)
  )
  useEffect(
    () => {
      setColor(getNamedColorFromDOM(colorName))
    },
    // Re-fetch color when theme changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [themeChangeCount]
  )

  return color
}

const getNamedColorFromDOM = (colorName: string) =>
  typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(document.body).getPropertyValue(`--${colorName}`)
    : undefined
