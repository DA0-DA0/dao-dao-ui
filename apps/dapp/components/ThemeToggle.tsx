import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useThemeContext } from 'ui'

export const defaultTheme = 'dark'

function ThemeToggle() {
  const themeContext = useThemeContext()

  const icon =
    themeContext.theme === 'light' ? (
      <MoonIcon className="inline w-5 h-5 mr-2" />
    ) : (
      <SunIcon className="inline w-5 h-5 mr-2" />
    )

  const nextTheme = themeContext.theme === 'dark' ? 'light' : 'dark'

  const text = themeContext.theme === 'light' ? 'Dark theme' : 'Light theme'

  return (
    <button
      type="button"
      onClick={() => themeContext.updateTheme(nextTheme)}
      className="flex items-center link-text"
    >
      {icon}
      {text}
    </button>
  )
}

export default ThemeToggle
