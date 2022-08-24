import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

import {
  ButtonifiedChildren,
  ButtonifierProps,
  getButtonifiedClassNames,
} from './Buttonifier'

export type ButtonLinkProps = ComponentPropsWithoutRef<'a'> &
  ButtonifierProps & {
    remote?: boolean
  }

export const ButtonLink = ({
  children,
  href,
  remote = false,
  ...props
}: ButtonLinkProps) => {
  props.disabled ||= props.loading

  const className = clsx(getButtonifiedClassNames(props), 'inline-block')

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
