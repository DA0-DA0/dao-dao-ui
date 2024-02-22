import { DarkMode, LightMode } from '@mui/icons-material'
import { forwardRef } from 'react'

import { IconButtonProps } from '@dao-dao/types'

import { Theme, useThemeContext } from '../../theme'
import { IconButton } from './IconButton'

export type ThemeToggleProps = Omit<
  IconButtonProps,
  'Icon' | 'circular' | 'iconClassName' | 'onClick' | 'size' | 'variant'
>

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle(props, ref) {
    const { theme, updateTheme } = useThemeContext()

    return (
      <IconButton
        {...props}
        Icon={theme === Theme.Light ? DarkMode : LightMode}
        circular
        iconClassName="!h-5 !w-5"
        onClick={() =>
          updateTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark)
        }
        ref={ref}
        variant="secondary"
      />
    )
  }
)
