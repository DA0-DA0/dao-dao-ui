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
    'flex shrink-0 items-center justify-center transition-all',

    focused && 'ring-2 ring-inset ring-border-interactive-focus',

    // Rounding.
    circular ? 'rounded-full' : 'rounded-md',

    // Sizes.
    {
      'h-5 w-5 p-1': size === 'xs',
      'h-6 w-6 p-1.5': size === 'sm',
      'h-8 w-8 p-2': size === 'default',
      'h-10 w-10 p-3': size === 'lg',
      'h-10 w-10 p-[0.625rem]': size === 'xl',
    },

    // Primary variant
    variant === 'primary' && {
      // Default
      'bg-background-button text-icon-button-primary hover:bg-background-button-hover active:bg-background-button-pressed':
        !disabled,
      // Disabled
      'bg-background-button-disabled text-icon-button-disabled': disabled,
    },
    // Secondary variant
    variant === 'secondary' && {
      // Default
      'bg-background-primary text-icon-primary hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabled,
      // Disabled
      'bg-background-button-disabled text-icon-interactive-disabled': disabled,
    },
    // Ghost variant
    variant === 'ghost' && {
      // Default
      'bg-transparent text-icon-secondary hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabled,
      // Disabled
      'text-icon-interactive-disabled': disabled,
    },
    // None variant
    variant === 'none' && {
      'p-0': true,
      // Default
      'bg-transparent text-icon-primary transition-opacity hover:opacity-80 active:opacity-70':
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
        '!h-4 !w-4': size === 'xs',
        '!h-[1.125rem] !w-[1.125rem]': size === 'sm',
        '!h-6 !w-6': size === 'default',
        '!h-7 !w-7': size === 'lg',
        '!h-[1.875rem] !w-[1.875rem]': size === 'xl',
      },
      iconClassName
    )}
  />
)
