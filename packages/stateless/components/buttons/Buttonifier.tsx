import clsx from 'clsx'
import { ComponentType, ReactNode } from 'react'

import { Logo as DefaultLogo, LogoProps } from '../logo/Logo'

const defaultVariant = 'primary'
const defaultSize = 'default'

export interface ButtonifierProps {
  variant?:
    | 'primary'
    | 'primary_outline'
    | 'secondary'
    | 'ghost'
    | 'underline'
    | 'none'
  size?: 'sm' | 'lg' | 'default' | 'none'
  loading?: boolean
  contentContainerClassName?: string
  pressed?: boolean
  hovering?: boolean
  disabled?: boolean
  showBadge?: boolean
  Logo?: ComponentType<LogoProps>
  className?: string
  children?: ReactNode | ReactNode[]
  center?: boolean
}

// Get props that should pass through the Buttonifier. None of the Buttonifier
// props should pass through except `disabled`.
export const getPassthroughProps = <P extends ButtonifierProps>({
  variant: _variant,
  size: _size,
  loading: _loading,
  contentContainerClassName: _contentContainerClassName,
  pressed: _pressed,
  hovering: _hovering,
  showBadge: _showBadge,
  Logo: _Logo,
  className: _className,
  children: _children,
  center: _center,
  ...props
}: P) => props

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
    'relative rounded-md transition-all focus:outline-2 focus:outline-background-button-disabled',
    // Ensure cannot click when loading.
    disabledOrLoading && 'pointer-events-none',
    // Let variants take color precedence over the text classes used here since
    // the variants are more specific, so just use the font text styling here.
    {
      // Sizes.
      'button-text py-[10px] px-[14px]': size === 'lg',
      'button-text-sm py-1 px-2': size === 'sm',
      'link-text py-[6px] px-[10px]': size === 'default',
    },

    // Primary variant
    variant === 'primary' && {
      // Default
      'bg-background-button text-text-button-primary hover:bg-background-button-hover active:bg-background-button-pressed':
        !disabledOrLoading,
      // Disabled
      'bg-background-button-disabled text-text-button-disabled':
        disabledOrLoading,
    },
    // Primary outline variant
    variant === 'primary_outline' && {
      'ring-2 ring-inset': true,
      // Default
      'text-background-button ring-background-button hover:bg-background-button-hover hover:text-text-button-primary hover:ring-0 active:bg-background-button-pressed active:text-text-button-primary active:ring-0':
        !disabledOrLoading,
      // Disabled
      'text-background-button-disabled ring-background-button-disabled':
        disabledOrLoading,
    },
    // Secondary variant
    variant === 'secondary' && {
      // Default
      'hover:bg-background-button-secondary-hover active:bg-background-button-secondary-pressed':
        !disabledOrLoading,
      // Default, not pressed
      'bg-background-button-secondary-default text-icon-primary':
        !disabledOrLoading && !pressed,
      // Disabled, not pressed
      'bg-background-button-secondary-disabled text-text-interactive-disabled':
        disabledOrLoading && !pressed,
      // Default or disabled, pressed
      'bg-background-interactive-active text-text-interactive-active': pressed,
    },
    // Ghost variant
    variant === 'ghost' && {
      // Default
      'hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
        !disabledOrLoading,
      // Default, not pressed
      'bg-transparent text-text-secondary': !disabledOrLoading && !pressed,
      // Disabled, not pressed
      'bg-transparent text-text-interactive-disabled':
        disabledOrLoading && !pressed,
      // Default or disabled, pressed
      'bg-transparent text-text-brand': pressed,
    },
    // Underline variant
    (variant === 'underline' || variant === 'none') && {
      // Always no padding
      '!p-0': true,
      underline: variant === 'underline',
      // Default
      'transition-opacity hover:opacity-80 active:opacity-70':
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
  center,
}: ButtonifierProps) => (
  <>
    <div
      className={clsx(
        'absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center',
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
      {loading && (
        <div className="mx-auto inline-block aspect-square h-full animate-spin-medium">
          <Logo invert={variant === 'primary'} size="100%" />
        </div>
      )}
    </div>
    <div
      className={clsx(
        // Add `relative` to allow children to be clickable. The absolute
        // container of the loading element above takes over touches if this is
        // not relative; adding relative puts them in the same stacking context.
        'relative flex h-full flex-row items-center gap-2',
        center && 'justify-center',
        {
          invisible: loading,
        },
        contentContainerClassName
      )}
    >
      {children}
    </div>

    {showBadge && (
      <div className="absolute top-[3px] right-[3px] box-content h-[6px] w-[6px] rounded-full border-[3px] border-background-base bg-icon-interactive-active"></div>
    )}
  </>
)
