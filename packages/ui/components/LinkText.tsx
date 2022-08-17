import Link, { LinkProps } from 'next/link'
import { ComponentProps } from 'react'

export interface LinkTextProps extends LinkProps {
  aProps: ComponentProps<'a'>
}

export const LinkText = ({ children, aProps, ...props }: LinkTextProps) => (
  <Link {...props}>
    <a {...aProps}>{children}</a>
  </Link>
)
