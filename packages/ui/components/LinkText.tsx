import Link, { LinkProps } from 'next/link'
import { ComponentProps, ReactNode } from 'react'

export interface LinkTextProps extends LinkProps {
  children: ReactNode | ReactNode[]
  aProps?: ComponentProps<'a'>
}

export const LinkText = ({ children, aProps, ...props }: LinkTextProps) => (
  <Link {...props}>
    <a {...aProps}>{children}</a>
  </Link>
)
