import {
  ReactNode,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardedRef,
} from 'react'

import { Logo } from '../Logo'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'lg'
  full?: boolean
  disabled?: boolean
  className?: string
  loading?: boolean
}

function ButtonComponent(
  {
    children,
    variant = 'primary',
    size = 'lg',
    full = false,
    disabled = false,
    loading = false,
    className = '',
    ...rest
  }: ButtonProps,
  ref?: ForwardedRef<any>
) {
  if (variant === 'primary') {
    return (
      <button
        ref={ref}
        className={`relative link-text text-light bg-btn rounded-md py-[6px] px-[16px] transition ${
          !disabled ? 'hover:bg-dark active:bg-toast' : 'bg-btn-disabled'
        } ${size === 'lg' ? 'py-[10px]' : ''} ${
          size === 'sm' ? 'py-[4px] px-[8px]' : ''
        } ${className}`}
        disabled={disabled || loading}
        {...rest}
      >
        <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
          <div
            className={`animate-spin inline-block mx-auto ${
              loading ? '' : 'invisible'
            }`}
          >
            <Logo width={20} height={20} invert />
          </div>
        </div>
        <div
          className={`${
            loading ? 'invisible' : ''
          } flex flex-row items-center gap-2`}
        >
          {children}
        </div>
      </button>
    )
  }
  if (variant == 'secondary') {
    return (
      <button
        ref={ref}
        className={`relative link-text bg-primary rounded-md py-[6px] px-[16px] transition ${
          !disabled
            ? 'hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed'
            : 'bg-btn-disabled'
        } ${size === 'lg' ? 'py-[10px]' : ''} ${
          size === 'sm' ? 'py-[4px] px-[8px]' : ''
        } ${className}`}
        disabled={disabled || loading}
        {...rest}
      >
        <div className="absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center">
          <div
            className={`animate-spin inline-block mx-auto ${
              loading ? '' : 'invisible'
            }`}
          >
            <Logo width={20} height={20} invert />
          </div>
        </div>
        <div
          className={`${
            loading ? 'invisible' : ''
          } flex flex-row items-center gap-2`}
        >
          {children}
        </div>
      </button>
    )
  }
  if (variant === 'ghost') {
    return (
      <button
        ref={ref}
        className={`link-text text-secondary transition hover:text-primary flex flex-row items-center gap-2 ${className}`}
        disabled={disabled || loading}
        {...rest}
      >
        {children}
      </button>
    )
  }

  return null
}

export const Button = forwardRef(ButtonComponent)
