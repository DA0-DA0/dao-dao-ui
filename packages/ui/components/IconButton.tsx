import clsx from 'clsx'
import { ReactNode } from 'react'

export interface IconButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'large' | 'small' | 'xs'
  icon: ReactNode
  disabled?: boolean
  onClick: () => void
  className?: string
}

export const IconButton = ({
  variant,
  size = 'default',
  icon,
  disabled,
  onClick,
  className,
}: IconButtonProps) => (
  <button
    className={clsx(
      'flex justify-center items-center focus:outline-2 focus:outline-focus',
      {
        // Sizes.
        'p-1 w-5 h-5 rounded-md': size === 'xs',
        'p-1.5 w-6 h-6 rounded-md': size === 'small',
        'p-2 w-8 h-8 rounded-md': size === 'default',
        'p-3 w-10 h-10 rounded-full': size === 'large',

        // Primary variant.
        'text-white bg-btn hover:bg-btn-hover active:bg-btn-pressed transition':
          variant === 'primary',
        'bg-btn-disabled': disabled && variant === 'primary',
        // Secondary variant.
        'text-dark bg-btn-secondary hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed transition':
          variant === 'secondary',
        'bg-btn-secondary-disabled': disabled && variant === 'secondary',

        // Ghost variant.
        'text-dark bg-transparent hover:bg-btn-ghost-hover active:bg-btn-secondary transition':
          variant === 'ghost',
        'bg-transparent': disabled && variant === 'ghost',
      },
      className
    )}
    disabled={disabled}
    onClick={onClick}
    type="button"
  >
    {icon}
  </button>
)
