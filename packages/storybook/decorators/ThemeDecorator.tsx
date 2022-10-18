// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import addons from '@storybook/addons'
import { DecoratorFn } from '@storybook/react'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode'

import { Theme, ThemeProvider } from '@dao-dao/ui'

const channel = addons.getChannel()

export const ThemeDecorator: DecoratorFn = (Story, ctx) => {
  const isDarkMode = useDarkMode()
  const [theme, setTheme] = useState<Theme>(
    isDarkMode ? Theme.Dark : Theme.Light
  )

  const [themeChangeCount, setThemeChangeCount] = useState(0)
  useEffect(() => {
    // Add body-text to storybook body to simulate real app.
    !document.body.classList.contains('body-text') &&
      document.body.classList.add('body-text')

    // Ensure correct theme class is set on document.
    Object.values(Theme).forEach((value) =>
      document.documentElement.classList.toggle(value, value === theme)
    )
    // Update theme change count.
    setThemeChangeCount((c) => c + 1)
  }, [theme])

  // Update storybook theme when dark mode value changes.
  useEffect(() => {
    const updater = (value: boolean) =>
      setTheme(value ? Theme.Dark : Theme.Light)

    channel.on(DARK_MODE_EVENT_NAME, updater)
    // Clean up.
    return () => channel.off(DARK_MODE_EVENT_NAME, updater)
  }, [])

  return (
    <ThemeProvider
      theme={theme}
      themeChangeCount={themeChangeCount}
      updateTheme={setTheme}
    >
      <div
        className={clsx(
          'absolute top-0 right-0 bottom-0 left-0 antialiased bg-background-base body-text',
          {
            // Don't add padding when displaying entire pages, to make the
            // storybook window most similar to a browser.
            'p-4': !ctx.title.includes('/ pages /'),
          }
        )}
      >
        <Story />
      </div>
    </ThemeProvider>
  )
}
