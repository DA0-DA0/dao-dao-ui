import clsx from 'clsx'
import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from 'react'

import { Logo } from '../Logo'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'lg'
  disabled?: boolean
  className?: string
  loading?: boolean
  contentContainerClassName?: string
  active?: boolean
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
    ...rest
  }: ButtonProps,
  ref?: ForwardedRef<any>
) {
  const isDisabled = disabled || loading

  return variant === 'primary' || variant === 'secondary' ? (
    <button
      className={clsx(
        'relative rounded-md py-[6px] px-[16px] transition',
        {
          // Primary
          'link-text bg-btn text-light': variant === 'primary',
          'hover:bg-dark active:bg-toast': variant === 'primary' && !isDisabled,
          'bg-dark': variant === 'primary' && active,
          // Secondary
          'link-text bg-primary': variant === 'secondary',
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
      <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
        <div
          className={clsx('mx-auto inline-block animate-spin-medium', {
            invisible: !loading,
          })}
        >
          <Logo height={20} invert width={20} />
        </div>
      </div>
      <div
        className={clsx(
          'flex flex-row items-center gap-2',
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
        'link-text flex flex-row items-center gap-2 text-secondary transition',
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
