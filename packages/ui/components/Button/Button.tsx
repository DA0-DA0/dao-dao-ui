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
  size?: 'sm' | 'lg'
  disabled?: boolean
  className?: string
  loading?: boolean
  contentContainerClassName?: string
  active?: boolean
  Logo?: ComponentType<LogoProps>
}

function ButtonComponent(
  {
    children,
    variant = 'primary',
    size = 'lg',
    disabled = false,
    loading = false,
    className,
    contentContainerClassName,
    type = 'button',
    active,
    Logo = DefaultLogo,
    ...rest
  }: ButtonProps,
  ref?: ForwardedRef<any>
) {
  const isDisabled = disabled || loading

  return variant === 'primary' || variant === 'secondary' ? (
    <button
      className={clsx(
        'relative py-[6px] px-[16px] rounded-md transition',
        {
          // Primary
          'text-light bg-btn link-text': variant === 'primary',
          'hover:bg-dark active:bg-toast': variant === 'primary' && !isDisabled,
          'bg-dark': variant === 'primary' && active,
          // Secondary
          'bg-primary link-text': variant === 'secondary',
          'hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed':
            variant === 'secondary' && !isDisabled,
          'bg-btn-secondary-hover': variant === 'secondary' && active,
          // Shared
          'bg-btn-disabled': isDisabled,
          'py-[10px]': size === 'lg',
          'py-[4px] px-[8px]': size === 'sm',
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
          <Logo invert size={20} />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-row gap-2 items-center',
          {
            invisible: loading,
          },
          contentContainerClassName
        )}
      >
        {children}
      </div>
    </button>
  ) : variant === 'ghost' ? (
    <button
      className={clsx(
        'flex flex-row gap-2 items-center text-secondary transition link-text',
        { 'hover:text-primary': !isDisabled, 'text-primary': active },
        className,
        contentContainerClassName
      )}
      disabled={isDisabled}
      ref={ref}
      type={type}
      {...rest}
    >
      {children}
    </button>
  ) : null
}

export const Button = forwardRef(ButtonComponent)
