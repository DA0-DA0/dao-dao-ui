import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useTranslation } from 'next-i18next'
import { FC } from 'react'

import { Theme, useThemeContext } from '@dao-dao/ui'

export const defaultTheme = 'dark'

const ThemeToggle: FC = () => {
  const { t } = useTranslation()
  const themeContext = useThemeContext()

  const icon =
    themeContext.theme === 'light' ? (
      <MoonIcon className="inline mr-2 w-5 h-5" />
    ) : (
      <SunIcon className="inline mr-2 w-5 h-5" />
    )

  const nextTheme = themeContext.theme === 'dark' ? Theme.Light : Theme.Dark

  const text =
    themeContext.theme === 'light'
      ? t('button.darkTheme')
      : t('button.lightTheme')

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
