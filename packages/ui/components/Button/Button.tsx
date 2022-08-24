import clsx from 'clsx'
import {
  ComponentPropsWithoutRef,
  ComponentType,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'

import { Logo as DefaultLogo, LogoProps } from '../Logo'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'lg' | 'default'
  disabled?: boolean
  className?: string
  loading?: boolean
  contentContainerClassName?: string
  pressed?: boolean
  Logo?: ComponentType<LogoProps>
}

function ButtonComponent(
  {
    children,
    variant = 'primary',
    size = 'default',
    disabled = false,
    loading = false,
    className,
    contentContainerClassName,
    type = 'button',
    pressed,
    Logo = DefaultLogo,
    ...rest
  }: ButtonProps,
  ref?: ForwardedRef<any>
) {
  const isDisabled = disabled || loading

  return (
    <button
      className={clsx(
        'relative text-text-button-primary rounded-md focus:outline-2 focus:outline-background-button-disabled transition stroke-current',
        {
          // Primary variant.
          'bg-background-button': variant === 'primary',
          'hover:bg-background-button-hover active:bg-background-button-pressed':
            !disabled && variant === 'primary',
          'bg-background-button-disabled': disabled && variant === 'primary',

          // Secondary variant.
          'text-icon-primary bg-background-button-secondary-default':
            variant === 'secondary' && !pressed,
          'hover:bg-background-button-secondary-hover active:bg-background-button-secondary-pressed':
            !disabled && variant === 'secondary',
          'bg-background-button-secondary-disabled':
            disabled && variant === 'secondary',
          'text-text-interactive-active bg-background-interactive-active':
            variant === 'secondary' && pressed,

          // Ghost variant.
          'text-icon-primary bg-transparent': variant === 'ghost',
          'hover:bg-background-interactive-hover active:bg-background-interactive-pressed':
            !disabled && variant === 'ghost',
          'bg-transparent': disabled && variant === 'ghost',

          // Sizes.
          'py-[10px] px-[14px] button-text': size === 'lg',
          'py-1 px-2 button-text-sm': size === 'sm',
          'py-[6px] px-[10px] link-text': size === 'default',
        },
        className
      )}
      disabled={isDisabled}
      ref={ref}
      type={type}
      {...rest}
    >
      <div className="flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center">
        <div
          className={clsx('inline-block mx-auto animate-spin-medium', {
            invisible: !loading,
          })}
        >
          <Logo size={20} />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-row gap-2 items-center',
          {
            invisible: loading,
            'text-text-interactive-disabled': isDisabled,
          },
          contentContainerClassName
        )}
      >
        {children}
      </div>
    </button>
  )
}

export const Button = forwardRef(ButtonComponent)
