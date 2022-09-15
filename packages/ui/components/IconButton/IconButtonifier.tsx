import clsx from 'clsx'
import { ComponentType } from 'react'

export interface IconButtonifierProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'default' | 'xl' | 'lg' | 'sm' | 'xs'
  circular?: boolean
  Icon: ComponentType<{ className: string }>
  disabled?: boolean
  focused?: boolean
  className?: string
  iconClassName?: string
}

// Get props the IconButtonifier does not use so the element wrappers can pass
// them through.
export const getNonIconButtonifierProps = <P extends IconButtonifierProps>({
  variant: _variant,
  size: _size,
  circular: _circular,
  Icon: _Icon,
  disabled: _disabled,
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
    'flex justify-center items-center focus:outline-2 focus:outline-border-interactive-focus focus:outline transition-all',

    focused && 'outline-2 outline-border-interactive-focus outline',

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
      'text-white': true,
      // Default
      'bg-btn hover:bg-btn-hover active:bg-btn-pressed': !disabled,
      // Disabled
      'bg-btn-disabled': disabled,
    },
    // Secondary variant
    variant === 'secondary' && {
      'text-dark': true,
      // Default
      'text-dark bg-btn-secondary hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed':
        !disabled,
      // Disabled
      'bg-btn-secondary-disabled': disabled,
    },
    // Ghost variant
    variant === 'ghost' && {
      'text-dark bg-transparent': true,
      // Default
      'hover:bg-btn-ghost-hover active:bg-btn-secondary': !disabled,
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
