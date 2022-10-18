// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { MoonIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { Sun } from '@dao-dao/icons'

import { Theme, useThemeContext } from '../theme'
import { IconButton } from './IconButton'

export interface ThemeToggleProps {
  compact?: boolean
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ compact = false }: ThemeToggleProps, ref) {
    const { theme, updateTheme } = useThemeContext()

    return (
      <IconButton
        Icon={theme === Theme.Light ? MoonIcon : Sun}
        circular
        className={clsx(compact && '!p-[0.42rem]')}
        onClick={() =>
          updateTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
        }
        ref={ref}
        size={compact ? 'default' : 'xl'}
        variant="secondary"
      />
    )
  }
)
