import clsx from 'clsx'

import { IconButtonifierProps } from '@dao-dao/types/stateless/IconButtonifier'

// Get props that should pass through the IconButtonifier, such as native props.
// Disable button if disabled or loading.
export const getPassthroughProps = <P extends IconButtonifierProps>({
  variant: _variant,
  size: _size,
  circular: _circular,
  Icon: _Icon,
  focused: _focused,
  className: _className,
  iconClassName: _iconClassName,
  disabled,
  loading,
  ...props
}: P) => ({
  ...props,
  disabled: disabled || loading,
})

export const getIconButtonifiedClassNames = ({
  variant = 'primary',
  size = 'default',
  circular,
  disabled,
  loading,
  focused,
  className,
}: Omit<IconButtonifierProps, 'icon'>) =>
  clsx(
    'flex shrink-0 items-center justify-center transition-all',

    focused && 'ring-2 ring-inset ring-border-interactive-focus',

    // Rounding.
    circular ? 'rounded-full' : 'rounded-md',

    // No cursor pointer if disabled.
    disabled && 'cursor-default',

    // Pulse if loading.
    loading && 'animate-pulse',

    // Sizes.
    {
      'h-5 w-5': size === 'xs',
      'h-6 w-6': size === 'sm',
      'h-8 w-8': size === 'default',
      // Icon size changes.
      'h-10 w-10': size === 'lg' || size === 'xl',
    },

    // Primary variant
    variant === 'primary' && {
      // Default
      'bg-background-button text-icon-button-primary hover:bg-background-button-hover active:bg-background-button-pressed':
        !disabled,
      // Disabled
      'bg-background-button-disabled text-icon-button-disabled': disabled,
    },
    // Inverted primary variant
    variant === 'primary_inverted' && {
      // Default
      'bg-icon-button-primary text-background-button hover:bg-text-button-disabled active:bg-icon-button-disabled':
        !disabled,
      // Disabled
      'bg-icon-button-disabled text-background-button-disabled': disabled,
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
