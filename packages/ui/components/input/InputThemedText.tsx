import clsx from 'clsx'
import { ComponentProps, FC } from 'react'

export type InputThemedTextProps = ComponentProps<'p'>

export const InputThemedText: FC<InputThemedTextProps> = ({
  className,
  children,
  ...props
}) => (
  <p
    className={clsx('rounded-lg border border-default py-2 px-3', className)}
    {...props}
  >
    {children}
  </p>
)
