import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { Logo as DefaultLogo, LogoProps } from '../Logo'

const defaultVariant = 'primary'
const defaultSize = 'default'

export interface ButtonifierProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'lg' | 'default'
  loading?: boolean
  contentContainerClassName?: string
  pressed?: boolean
  disabled?: boolean
  Logo?: ComponentType<LogoProps>
  className?: string
  children?: ReactNode | ReactNode[]
}

export const getButtonifiedClassNames = ({
  variant = defaultVariant,
  size = defaultSize,
  pressed,
  disabled,
  className,
}: ButtonifierProps) =>
  clsx(
    'relative rounded-md focus:outline-2 focus:outline-background-button-disabled transition',
    {
      // Primary variant.
      '!text-text-button-primary bg-background-button': variant === 'primary',
      'hover:bg-background-button-hover active:bg-background-button-pressed':
        !disabled && variant === 'primary',
      'bg-background-button-disabled': disabled && variant === 'primary',

      // Secondary variant.
      '!text-icon-primary bg-background-button-secondary-default':
        variant === 'secondary' && !pressed,
      'hover:bg-background-button-secondary-hover active:bg-background-button-secondary-pressed':
        !disabled && variant === 'secondary',
      'bg-background-button-secondary-disabled':
        disabled && variant === 'secondary',
      '!text-text-interactive-active bg-background-interactive-active':
        variant === 'secondary' && pressed,

      // Ghost variant.
      '!text-icon-primary bg-transparent': variant === 'ghost',
      'hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabled && variant === 'ghost',
      'bg-transparent': disabled && variant === 'ghost',

      // Sizes.
      'py-[10px] px-[14px] button-text': size === 'lg',
      'py-1 px-2 button-text-sm': size === 'sm',
      'py-[6px] px-[10px] link-text': size === 'default',
    },
    className
  )

export const ButtonifiedChildren = ({
  variant = defaultVariant,
  size = defaultSize,
  loading = false,
  contentContainerClassName,
  Logo = DefaultLogo,
  disabled,
  children,
}: ButtonifierProps) => (
  <>
    <div
      className={clsx(
        'flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center',
        {
          // Match padding of container (by inheriting it) so the logo is the
          // same height as the text.
          'p-[inherit]': size !== 'lg',
          // The container padding makes the logo a bit small on lg size, so
          // manually override.
          'p-2': size === 'lg',
        }
      )}
    >
      <div
        className={clsx(
          'aspect-square inline-block mx-auto h-full animate-spin-medium',
          {
            invisible: !loading,
          }
        )}
      >
        <Logo invert={variant === 'primary'} size="100%" />
      </div>
    </div>
    <div
      className={clsx(
        'flex flex-row gap-2 items-center',
        {
          invisible: loading,
          'text-text-interactive-disabled': disabled,
        },
        contentContainerClassName
      )}
    >
      {children}
    </div>
  </>
)
