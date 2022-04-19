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
  disabled?: boolean
  className?: string
  loading?: boolean
}

function ButtonComponent(
  {
    children,
    variant = 'primary',
    size = 'lg',
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
        className={`relative link-text text-light bg-btn rounded-md py-[6px] px-[16px] transition ${
          !disabled ? 'hover:bg-dark active:bg-toast' : 'bg-btn-disabled'
        } ${size === 'lg' ? 'py-[10px]' : ''} ${
          size === 'sm' ? 'py-[4px] px-[8px]' : ''
        } ${className}`}
        disabled={disabled || loading}
        ref={ref}
        {...rest}
      >
        <div className="flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center">
          <div
            className={`animate-spin inline-block mx-auto ${
              loading ? '' : 'invisible'
            }`}
          >
            <Logo height={20} invert width={20} />
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
        className={`relative link-text bg-primary rounded-md py-[6px] px-[16px] transition ${
          !disabled
            ? 'hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed'
            : 'bg-btn-disabled'
        } ${size === 'lg' ? 'py-[10px]' : ''} ${
          size === 'sm' ? 'py-[4px] px-[8px]' : ''
        } ${className}`}
        disabled={disabled || loading}
        ref={ref}
        {...rest}
      >
        <div className="flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center">
          <div
            className={`animate-spin inline-block mx-auto ${
              loading ? '' : 'invisible'
            }`}
          >
            <Logo height={20} invert width={20} />
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
        className={`link-text text-secondary transition hover:text-primary flex flex-row items-center gap-2 ${className}`}
        disabled={disabled || loading}
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    )
  }

  return null
}

export const Button = forwardRef(ButtonComponent)
