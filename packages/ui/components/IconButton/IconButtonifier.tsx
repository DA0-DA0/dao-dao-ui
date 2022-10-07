import clsx from 'clsx'
import { ComponentType } from 'react'

export interface IconButtonifierProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'none'
  size?: 'default' | 'xl' | 'lg' | 'sm' | 'xs'
  circular?: boolean
  Icon: ComponentType<{ className: string }>
  disabled?: boolean
  focused?: boolean
  className?: string
  iconClassName?: string
}

// Get props that should pass through the IconButtonifier. None of the
// IconButtonifier props should pass through except `disabled`.
export const getNonIconButtonifierProps = <P extends IconButtonifierProps>({
  variant: _variant,
  size: _size,
  circular: _circular,
  Icon: _Icon,
  focused: _focused,
  className: _className,
  iconClassName: _iconClassName,
  ...props
}: P) => props

export const getIconButtonifiedClassNames = ({
  variant = 'primary',
  size = 'default',
  circular,
  disabled,
  focused,
  className,
}: Omit<IconButtonifierProps, 'icon'>) =>
  clsx(
    'flex shrink-0 justify-center items-center transition-all',

    focused && 'ring-2 ring-border-interactive-focus ring-inset',

    // Rounding.
    circular ? 'rounded-full' : 'rounded-md',

    // Sizes.
    {
      'p-1 w-5 h-5': size === 'xs',
      'p-1.5 w-6 h-6': size === 'sm',
      'p-2 w-8 h-8': size === 'default',
      'p-3 w-10 h-10': size === 'lg',
      'p-[0.625rem] w-10 h-10': size === 'xl',
    },

    // Primary variant
    variant === 'primary' && {
      // Default
      'text-icon-button-primary bg-background-button hover:bg-background-button-hover active:bg-background-button-pressed':
        !disabled,
      // Disabled
      'text-icon-button-disabled bg-background-button-disabled': disabled,
    },
    // Secondary variant
    variant === 'secondary' && {
      // Default
      'text-icon-primary bg-background-primary hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabled,
      // Disabled
      'text-icon-interactive-disabled bg-background-button-disabled': disabled,
    },
    // Ghost variant
    variant === 'ghost' && {
      // Default
      'text-icon-secondary bg-transparent hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabled,
      // Disabled
      'text-icon-interactive-disabled': disabled,
    },
    // None variant
    variant === 'none' && {
      'p-0': true,
      // Default
      'text-icon-primary bg-transparent hover:opacity-80 active:opacity-70 transition-opacity':
        !disabled,
      // Disabled
      'text-icon-interactive-disabled': disabled,
    },
    className
  )

export const IconButtonifiedChildren = ({
  Icon,
  iconClassName,
  size,
}: Pick<IconButtonifierProps, 'Icon' | 'iconClassName' | 'size'>) => (
  <Icon
    className={clsx(
      // Sizes.
      {
        '!w-4 !h-4': size === 'xs',
        '!w-[1.125rem] !h-[1.125rem]': size === 'sm',
        '!w-6 !h-6': size === 'default',
        '!w-7 !h-7': size === 'lg',
        '!w-[1.875rem] !h-[1.875rem]': size === 'xl',
      },
      iconClassName
    )}
  />
)
