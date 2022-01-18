import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import daisyuiThemes from 'styles/daisyui-themes.json'
import { themeChange } from 'theme-change'
import { useThemeContext } from '../contexts/theme'

const [junoLight, junoDark] = Object.keys(daisyuiThemes) || ['']

export const defaultTheme = junoLight

function ThemeToggle() {
  const themeContext = useThemeContext()

  useEffect(() => {
    themeChange(false)
  })

  const updatedTheme = themeContext.theme !== junoLight ? junoLight : junoDark

  const icon =
    themeContext.theme === junoLight ? (
      <MoonIcon className="inline w-5 h-5 mr-2" />
    ) : (
      <SunIcon className="inline w-5 h-5 mr-2" />
    )

  const text = themeContext.theme === junoLight ? 'Dark theme' : 'Light theme'

  return (
    <button
      type="button"
      data-set-theme={updatedTheme}
      onClick={() => themeContext.updateTheme(updatedTheme)}
      className="flex items-center"
    >
      {icon}
      {text}
    </button>
  )
}

export default ThemeToggle
