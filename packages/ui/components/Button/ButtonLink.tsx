import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

import {
  ButtonifiedChildren,
  ButtonifierProps,
  getButtonifiedClassNames,
} from './Buttonifier'

export type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & ButtonifierProps

export const ButtonLink = ({ children, href, ...props }: ButtonLinkProps) => {
  props.disabled ||= props.loading
  const className = clsx(getButtonifiedClassNames(props), 'inline-block')

  // Remote link if starts with http (non-relative path).
  const remote = href?.startsWith('http')

  return remote ? (
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      {...props}
      className={className}
    >
      <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
    </a>
  ) : (
    <Link href={href ?? '#'}>
      <a {...props} className={className}>
        <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
      </a>
    </Link>
  )
}
