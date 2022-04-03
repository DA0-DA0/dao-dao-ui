import {
  ReactNode,
  ComponentPropsWithoutRef,
  memo,
  forwardRef,
  ForwardedRef,
} from 'react'

import { useThemeContext } from '../theme'

type ButtonIconProps = {
  icon?: ReactNode
  position: string
}

const ButtonIcon = memo(function ButtonIcon({
  icon,
  position,
}: ButtonIconProps) {
  if (!icon) return null

  const padding = position === 'left' ? 'pr-1.5' : 'pl-1.5'

  return <i className={`btn-icon ${padding}`}>{icon}</i>
})

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'lg'
  full?: boolean
  disabled?: boolean
}

function ButtonComponent(
  {
    children,
    variant = 'primary',
    size = 'lg',
    full = false,
    disabled = false,
    ...rest
  }: ButtonProps,
  ref?: ForwardedRef<any>
) {
  console.log(disabled)
  if (variant === 'primary') {
    return (
      <button
        className={`link-text text-light bg-btn rounded-md py-[6px] px-[16px] flex flex-row items-center gap-2 transition ${
          !disabled ? 'hover:bg-dark active:bg-toast' : 'bg-btn-disabled'
        } ${size === 'lg' ? 'py-[10px]' : ''} ${
          size === 'sm' ? 'py-[4px] px-[8px]' : ''
        }`}
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
        }`}
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
