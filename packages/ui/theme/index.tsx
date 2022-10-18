import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  // Automatically falls back to brand color.
  accentColor: string
  setAccentColor: SetAccentColorFn
}

export const DEFAULT_THEME_NAME = Theme.Dark

export const DEFAULT_THEME: IThemeContext = {
  theme: DEFAULT_THEME_NAME,
  themeChangeCount: 0,
  updateTheme: (themeName: string) => {
    console.error(`do-nothing update for ${themeName}`)
  },
  accentColor: '',
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
}: PropsWithChildren<
  Omit<IThemeContext, 'accentColor' | 'setAccentColor'>
>) => {
  // This is the same as the `useNamedThemeColor` hook, but that hook assumes it
  // is wrapped in this ThemeProvider, so let's just get the brand manually.
  const [accentColor, _setAccentColor] = useState(
    `rgb(${getNamedColorFromDOM('v2-brand') || '123, 97, 255'})`
  )
  const setAccentColor = useCallback(
    (accentColor: string | undefined) =>
      _setAccentColor(
        accentColor || `rgb(${getNamedColorFromDOM('v2-brand')})`
      ),
    []
  )

  return (
    <ThemeContext.Provider
      value={useMemo(
        () => ({
          ...DEFAULT_THEME,
          theme,
          themeChangeCount,
          updateTheme,
          accentColor,
          setAccentColor,
        }),
        [accentColor, setAccentColor, theme, themeChangeCount, updateTheme]
      )}
    >
      {children}
    </ThemeContext.Provider>
  )
}

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
    ? getComputedStyle(document.body).getPropertyValue(`--${colorName}`).trim()
    : undefined
