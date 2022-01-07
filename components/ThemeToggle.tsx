import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import daisyuiThemes from 'styles/daisyui-themes.json'
import { themeChange } from 'theme-change'
import { useThemeContext } from '../contexts/theme'

const themes = Object.keys(daisyuiThemes) || ['']
export const defaultTheme = themes[0]

function ThemeToggle() {
  const themeContext = useThemeContext()

  useEffect(() => {
    themeChange(false)
  })

  const updatedTheme =
    themeContext.theme !== defaultTheme ? defaultTheme : themes[1]

  const icon =
    themeContext.theme === themes[0] ? (
      <MoonIcon className="inline w-5 h-5 mr-2 mb-1" />
    ) : (
      <SunIcon className="inline w-5 h-5 mr-2 mb-1" />
    )
  const text = themeContext.theme === themes[0] ? 'Dark theme' : 'Light theme'

  return (
    <button
      type="button"
      data-set-theme={updatedTheme}
      onClick={() => themeContext.updateTheme(updatedTheme)}
    >
      {icon}
      {text}
    </button>
  )
}

export default ThemeToggle
