// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { useTranslation } from 'react-i18next'

import { Theme, useThemeContext } from '@dao-dao/ui'

export const defaultTheme = 'dark'

const ThemeToggle = () => {
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
