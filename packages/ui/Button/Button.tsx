import {
  ReactNode,
  ComponentPropsWithoutRef,
  forwardRef,
  ForwardedRef,
} from 'react'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  full?: boolean
  disabled?: boolean
  iconBefore?: ReactNode
  iconAfter?: ReactNode
}

function ButtonComponent(
  {
    children,
    variant = 'primary',
    size = 'lg',
    full = false,
    disabled = false,
    iconBefore,
    iconAfter,
    ...rest
  }: ButtonProps,
  ref?: ForwardedRef<any>
) {
  return (
    <button
      ref={ref}
      className={`flex items-center gap-2 justify-center rounded-md bg-dark text-white px-2 py-1 transition ${
        full ? ' w-full' : ''
      } text-${size} ${
        variant === 'secondary' ? 'text-primary bg-primary' : ''
      }`}
      disabled={disabled}
      {...rest}
    >
      {iconBefore && iconBefore}
      {children}
      {iconAfter && iconAfter}
    </button>
  )
}

export const Button = forwardRef(ButtonComponent)
