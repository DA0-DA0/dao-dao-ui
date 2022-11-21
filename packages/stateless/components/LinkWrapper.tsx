import clsx from 'clsx'
import Link from 'next/link'
import { forwardRef } from 'react'

import { LinkWrapperProps } from '@dao-dao/types'

export const LinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  function LinkWrapper({ href, children, loading, ...props }, ref) {
    // If loading, don't navigate anywhere. Anchor tags cannot be disabled, so
    // this is a workaround.
    href = loading ? '#' : href

    // Remote link if starts with http (non-relative path).
    const remote = href?.startsWith('http')

    return remote ? (
      <a href={href} ref={ref} rel="noreferrer" target="_blank" {...props}>
        {children}
      </a>
    ) : (
      <Link href={href ?? '#'}>
        <a
          ref={ref}
          {...props}
          className={clsx(props.className, loading && 'animate-pulse')}
        >
          {children}
        </a>
      </Link>
    )
  }
)
