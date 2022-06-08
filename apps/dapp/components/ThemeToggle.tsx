import { MoonIcon, SunIcon } from '@heroicons/react/outline'

import i18n from '@dao-dao/i18n'
import { useThemeContext } from '@dao-dao/ui'
import { Theme } from '@dao-dao/ui'

export const defaultTheme = 'dark'

function ThemeToggle() {
  const themeContext = useThemeContext()

  const icon =
    themeContext.theme === 'light' ? (
      <MoonIcon className="inline mr-2 w-5 h-5" />
    ) : (
      <SunIcon className="inline mr-2 w-5 h-5" />
    )

  const nextTheme = themeContext.theme === 'dark' ? Theme.Light : Theme.Dark

  const text = themeContext.theme === 'light' ? i18n.t('Dark theme') : i18n.t('Light theme')

  return (
    <button
      className="flex items-center link-text"
      onClick={() => themeContext.updateTheme(nextTheme)}
      type="button"
    >
      {icon}
      {text}
    </button>
  )
}

export default ThemeToggle
