// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { MoonIcon } from '@heroicons/react/outline'

import { Sun } from '@dao-dao/icons'

import { Theme, useThemeContext } from '../theme'
import { IconButton } from './IconButton'

export const ThemeToggle = () => {
  const { theme, updateTheme } = useThemeContext()

  return (
    <IconButton
      Icon={theme === Theme.Light ? MoonIcon : Sun}
      circular
      onClick={() =>
        updateTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
      }
      size="xl"
      variant="secondary"
    />
  )
}
