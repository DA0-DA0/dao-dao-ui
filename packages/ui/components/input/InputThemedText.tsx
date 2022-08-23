import clsx from 'clsx'
import { ComponentProps } from 'react'

export type InputThemedTextProps = ComponentProps<'p'>

export const InputThemedText = ({
  className,
  children,
  ...props
}: InputThemedTextProps) => (
  <p
    className={clsx('py-2 px-3 rounded-lg border border-default', className)}
    {...props}
  >
    {children}
  </p>
)
