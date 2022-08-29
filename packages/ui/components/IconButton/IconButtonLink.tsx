import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef } from 'react'

import {
  IconButtonifiedChildren,
  IconButtonifierProps,
  getIconButtonifiedClassNames,
} from './IconButtonifier'

export type IconButtonLinkProps = ComponentPropsWithoutRef<'a'> &
  IconButtonifierProps

export const IconButtonLink = ({ href, ...props }: IconButtonLinkProps) => {
  const className = clsx(getIconButtonifiedClassNames(props), 'inline-block')

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
      <IconButtonifiedChildren {...props} />
    </a>
  ) : (
    <Link href={href ?? '#'}>
      <a {...props} className={className}>
        <IconButtonifiedChildren {...props} />
      </a>
    </Link>
  )
}
