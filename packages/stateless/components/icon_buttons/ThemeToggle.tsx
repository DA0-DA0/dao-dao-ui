import { DarkMode, LightMode } from '@mui/icons-material'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { IconButtonProps } from '@dao-dao/types'

import { Theme, useThemeContext } from '../../theme'
import { IconButton } from './IconButton'

export type ThemeToggleProps = Omit<
  IconButtonProps,
  'Icon' | 'circular' | 'iconClassName' | 'onClick' | 'size' | 'variant'
> & {
  compact?: boolean
}

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  function ThemeToggle({ compact = false, className, ...props }, ref) {
    const { theme, updateTheme } = useThemeContext()

    return (
      <IconButton
        {...props}
        Icon={theme === Theme.Light ? DarkMode : LightMode}
        circular
        className={clsx(compact ? '!h-8 !w-8' : '!h-10 !w-10', className)}
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
