import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { Logo as DefaultLogo, LogoProps } from '../Logo'

const defaultVariant = 'primary'
const defaultSize = 'default'

export interface ButtonifierProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'underline'
  size?: 'sm' | 'lg' | 'default'
  loading?: boolean
  contentContainerClassName?: string
  pressed?: boolean
  hovering?: boolean
  disabled?: boolean
  showBadge?: boolean
  Logo?: ComponentType<LogoProps>
  className?: string
  children?: ReactNode | ReactNode[]
}

export const getButtonifiedClassNames = ({
  variant = defaultVariant,
  size = defaultSize,
  pressed,
  disabled,
  loading,
  className,
}: ButtonifierProps) => {
  const disabledOrLoading = disabled || loading

  return clsx(
    'relative rounded-md focus:outline-2 focus:outline-background-button-disabled transition-all',
    // Let variants take color precedence over the text classes used here since
    // the variants are more specific, so just use the font text styling here.
    {
      // Sizes.
      'py-[10px] px-[14px] button-text': size === 'lg',
      'py-1 px-2 button-text-sm': size === 'sm',
      'py-[6px] px-[10px] link-text': size === 'default',
    },

    // Primary variant
    variant === 'primary' && {
      // Default
      'text-text-button-primary bg-background-button hover:bg-background-button-hover active:bg-background-button-pressed':
        !disabledOrLoading,
      // Disabled
      'text-text-button-disabled bg-background-button-disabled':
        disabledOrLoading,
    },
    // Secondary variant
    variant === 'secondary' && {
      // Default
      'hover:bg-background-button-secondary-hover active:bg-background-button-secondary-pressed':
        !disabledOrLoading,
      // Default, not pressed
      'text-icon-primary bg-background-button-secondary-default':
        !disabledOrLoading && !pressed,
      // Default, pressed
      'text-text-interactive-active bg-background-interactive-active':
        !disabledOrLoading && pressed,
      // Disabled
      'text-text-interactive-disabled bg-background-button-secondary-disabled':
        disabledOrLoading,
    },
    // Ghost variant
    variant === 'ghost' && {
      // Default
      'hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabledOrLoading,
      // Default, not pressed
      'text-text-secondary bg-transparent': !disabledOrLoading && !pressed,
      // Default, pressed
      'text-text-brand bg-transparent': !disabledOrLoading && pressed,
      // Disabled
      'text-text-interactive-disabled bg-transparent': disabledOrLoading,
    },
    // Underline variant
    variant === 'underline' && {
      // Always (no padding if underline)
      '!p-0 underline': true,
      // Default
      'hover:opacity-80 active:opacity-70 transition-opacity':
        !disabledOrLoading,
      // Disabled
      'text-text-button-disabled': disabledOrLoading,
    },
    className
  )
}

export const ButtonifiedChildren = ({
  variant = defaultVariant,
  size = defaultSize,
  loading = false,
  contentContainerClassName,
  Logo = DefaultLogo,
  showBadge,
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
        'flex flex-row gap-2 items-center h-full',
        {
          invisible: loading,
        },
        contentContainerClassName
      )}
    >
      {children}
    </div>

    {showBadge && (
      <div className="box-content absolute top-[3px] right-[3px] w-[6px] h-[6px] bg-icon-interactive-active rounded-full border-[3px] border-background-base"></div>
    )}
  </>
)
