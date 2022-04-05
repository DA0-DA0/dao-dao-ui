import {
  ReactNode,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardedRef,
} from 'react'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'lg'
  full?: boolean
  disabled?: boolean
  className?: string
}

function ButtonComponent(
  {
    children,
    variant = 'primary',
    size = 'lg',
    full = false,
    disabled = false,
    className = '',
    ...rest
  }: ButtonProps,
  ref?: ForwardedRef<any>
) {
  if (variant === 'primary') {
    return (
      <button
        className={`link-text text-light bg-btn rounded-md py-[6px] px-[16px] flex flex-row items-center gap-2 transition ${
          !disabled ? 'hover:bg-dark active:bg-toast' : 'bg-btn-disabled'
        } ${size === 'lg' ? 'py-[10px]' : ''} ${
          size === 'sm' ? 'py-[4px] px-[8px]' : ''
        } ${className}`}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    )
  }
  if (variant == 'secondary') {
    return (
      <button
        className={`link-text bg-primary rounded-md py-[6px] px-[16px] flex flex-row items-center gap-2 transition ${
          !disabled
            ? 'hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed'
            : 'bg-btn-disabled'
        } ${size === 'lg' ? 'py-[10px]' : ''} ${
          size === 'sm' ? 'py-[4px] px-[8px]' : ''
        } ${className}`}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    )
  }
  return null
}

export const Button = forwardRef(ButtonComponent)
