import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import {
  IconButtonifiedChildren,
  IconButtonifierProps,
  getIconButtonifiedClassNames,
} from './IconButtonifier'

export type IconButtonLinkProps = ComponentPropsWithoutRef<'a'> &
  IconButtonifierProps

export const IconButtonLink = forwardRef<
  HTMLAnchorElement,
  IconButtonLinkProps
>(function IconButtonLink({ href, ...props }, ref) {
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
      ref={ref}
    >
      <IconButtonifiedChildren {...props} />
    </a>
  ) : (
    <Link href={href ?? '#'}>
      <a {...props} className={className} ref={ref}>
        <IconButtonifiedChildren {...props} />
      </a>
    </Link>
  )
})
