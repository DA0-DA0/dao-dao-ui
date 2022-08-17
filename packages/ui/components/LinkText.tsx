import Link, { LinkProps } from 'next/link'
import { ComponentProps, FC } from 'react'

export interface LinkTextProps extends LinkProps {
  aProps?: ComponentProps<'a'>
}

export const LinkText: FC<LinkTextProps> = ({ children, aProps, ...props }) => (
  <Link {...props}>
    <a {...aProps}>{children}</a>
  </Link>
)
