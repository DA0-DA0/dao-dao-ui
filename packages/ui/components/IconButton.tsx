import clsx from 'clsx'
import { ReactNode } from 'react'

export interface IconButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large' | 'small'
  icon: ReactNode
  disabled?: boolean
  onClick: () => null
}

export const IconButton = ({
  variant,
  size = 'default',
  icon,
  disabled,
  onClick,
}: IconButtonProps) => (
  <button
    className={clsx('focus:outline-2 focus:outline-focus', {
      // Sizes.
      'p-1.5 w-6 h-6 rounded-md': size === 'small',
      'p-2 w-8 h-8 rounded-md': size === 'default',
      'p-3 w-10 h-10 rounded-full': size === 'large',

      // Primary variant.
      'text-white bg-btn hover:bg-btn-hover active:bg-btn-pressed transition stroke-current':
        variant === 'primary',
      'bg-btn-disabled': disabled && variant === 'primary',

      // Secondary variant.
      'text-dark bg-btn-secondary hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed transition stroke-current':
        variant === 'secondary',
      'bg-btn-secondary-disabled': disabled && variant === 'secondary',

      // Ghost variant.
      'text-dark bg-transparent hover:bg-btn-ghost-hover active:bg-btn-secondary transition stroke-current':
        variant === 'ghost',
      'bg-transparent': disabled && variant === 'ghost',
    })}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {icon}
  </button>
)
