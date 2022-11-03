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
      'ring-border-primary rounded-md py-3 px-4 ring-1',
      className
    )}
    {...props}
  >
    {children}
  </p>
)
