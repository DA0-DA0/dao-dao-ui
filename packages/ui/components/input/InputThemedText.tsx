import clsx from 'clsx'
import { ComponentProps } from 'react'

export type InputThemedTextProps = ComponentProps<'p'>

export const InputThemedText = ({
  className,
  children,
  ...props
}: InputThemedTextProps) => (
  <p
    className={clsx(
      'py-3 px-4 rounded-md ring-1 ring-border-primary',
      className
    )}
    {...props}
  >
    {children}
  </p>
)
