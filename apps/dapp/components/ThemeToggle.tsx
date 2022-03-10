import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useThemeContext } from 'ui'
import daisyuiThemes from 'ui/daisyui-themes.json'

const [junoLight, junoDark] = Object.keys(daisyuiThemes) || ['']

export const defaultTheme = junoLight

function ThemeToggle() {
  const themeContext = useThemeContext()

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
      onClick={() => themeContext.updateTheme(updatedTheme)}
      className="flex items-center"
    >
      {icon}
      {text}
    </button>
  )
}

export default ThemeToggle
