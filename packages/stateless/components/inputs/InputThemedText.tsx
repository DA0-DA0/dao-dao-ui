import clsx from 'clsx'
import { ComponentProps } from 'react'

export type InputThemedTextProps = ComponentProps<'p'>

export const InputThemedText = ({
  className,
  children,
  ...props
}: InputThemedTextProps) => (
  <div
    className={clsx(
      'rounded-md py-3 px-4 ring-1 ring-border-primary',
      className
    )}
    {...props}
  >
    {children}
  </div>
)
