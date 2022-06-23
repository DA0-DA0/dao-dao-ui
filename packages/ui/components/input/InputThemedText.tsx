import clsx from 'clsx'
import { ComponentProps, FC } from 'react'

export type InputThemedTextProps = ComponentProps<'p'>

export const InputThemedText: FC<InputThemedTextProps> = ({
  className,
  children,
  ...props
}) => (
  <p
    className={clsx('py-2 px-3 rounded-lg border border-default', className)}
    {...props}
  >
    {children}
  </p>
)
