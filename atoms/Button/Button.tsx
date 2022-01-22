import {
  ReactNode,
  ComponentPropsWithoutRef,
  memo,
  forwardRef,
  ForwardedRef,
} from 'react'
import { useThemeContext } from 'contexts/theme'
import { CashIcon } from '@heroicons/react/outline'
import daisyuiThemes from 'styles/daisyui-themes.json'

const [junoLight, junoDark] = Object.keys(daisyuiThemes) || ['']

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

  return <span className={`btn-icon ${padding}`}>{icon}</span>
})

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
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
  const themeContext = useThemeContext()
  const theme = themeContext.theme === junoLight ? 'light' : 'dark'
  const withIcon = iconBefore || iconAfter
  let other = disabled ? ' disabled' : ''

  if (!withIcon) other += ' truncate'

  return (
    <button
      ref={ref}
      className={`btn ${theme} ${variant} ${size}${
        full ? ' w-full' : ''
      }${other}`}
      disabled={disabled}
      {...rest}
    >
      {withIcon ? (
        <div className="flex justify-between">
          <div className="truncate">
            <ButtonIcon icon={iconBefore} position="left" />
            <span className="align-middle">{children}</span>
          </div>
          <div>
            <ButtonIcon icon={iconAfter} position="right" />
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  )
}

export const Button = forwardRef(ButtonComponent)
