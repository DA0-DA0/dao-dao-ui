import { MoonIcon, SunIcon } from '@heroicons/react/outline'
import { FC } from 'react'

import { useTranslation } from '@dao-dao/i18n'
import { Theme, useThemeContext } from '@dao-dao/ui'

export const defaultTheme = 'dark'

const ThemeToggle: FC = () => {
  const { t } = useTranslation()
  const themeContext = useThemeContext()

  const icon =
    themeContext.theme === 'light' ? (
      <MoonIcon className="mr-2 inline h-5 w-5" />
    ) : (
      <SunIcon className="mr-2 inline h-5 w-5" />
    )

  const nextTheme = themeContext.theme === 'dark' ? Theme.Light : Theme.Dark

  const text =
    themeContext.theme === 'light'
      ? t('button.darkTheme')
      : t('button.lightTheme')

  return (
    <button
      className="link-text flex items-center"
      onClick={() => themeContext.updateTheme(nextTheme)}
      type="button"
    >
      {icon}
      {text}
    </button>
  )
}

export default ThemeToggle
