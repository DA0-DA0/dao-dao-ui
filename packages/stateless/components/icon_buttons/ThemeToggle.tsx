// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { DarkMode, LightMode } from '@mui/icons-material'
import { forwardRef } from 'react'

import { Theme, useThemeContext } from '../../theme'
import { IconButton } from './IconButton'

export interface ThemeToggleProps {
  compact?: boolean
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ compact = false }: ThemeToggleProps, ref) {
    const { theme, updateTheme } = useThemeContext()

    return (
      <IconButton
        Icon={theme === Theme.Light ? DarkMode : LightMode}
        circular
        className={compact ? 'h-8 w-8' : 'h-10 w-10'}
        iconClassName={compact ? '!h-5 !w-5' : '!h-6 !w-6'}
        onClick={() =>
          updateTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
        }
        ref={ref}
        size="custom"
        variant="secondary"
      />
    )
  }
)
