// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import addons from '@storybook/addons'
import { DecoratorFn } from '@storybook/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode'

import { Theme, ThemeProvider } from '../theme'

const channel = addons.getChannel()

export const ThemeDecorator: DecoratorFn = (Story) => {
  const [accentColor, setAccentColor] = useState<string>()

  const isDarkMode = useDarkMode()
  const [theme, setTheme] = useState<Theme>(
    isDarkMode ? Theme.Dark : Theme.Light
  )

  const [themeChangeCount, setThemeChangeCount] = useState(0)
  useEffect(() => {
    // Update theme change count.
    setThemeChangeCount((c) => c + 1)
  }, [theme])

  // Update theme when dark mode value changes.
  useEffect(() => {
    const updater = (value: boolean) =>
      setTheme(value ? Theme.Dark : Theme.Light)

    channel.on(DARK_MODE_EVENT_NAME, updater)
    // Clean up.
    return () => channel.off(DARK_MODE_EVENT_NAME, updater)
  }, [])

  return (
    <ThemeProvider
      accentColor={accentColor}
      setAccentColor={setAccentColor}
      theme={theme}
      themeChangeCount={themeChangeCount}
      updateTheme={setTheme}
    >
      <div
        className={clsx(
          'absolute top-0 right-0 bottom-0 left-0 p-4 antialiased bg-white body-text',
          {
            dark: theme === Theme.Dark,
          }
        )}
      >
        <Story />
      </div>
    </ThemeProvider>
  )
}
