import clsx from 'clsx'
import Link from 'next/link'
import { forwardRef } from 'react'

import { LinkWrapperProps } from '@dao-dao/types'

export const LinkWrapper = forwardRef<HTMLAnchorElement, LinkWrapperProps>(
  function LinkWrapper({ href, children, loading, ...props }, ref) {
    // Remote link if starts with http (non-relative path).
    const remote = href?.startsWith('http')

    return remote ? (
      <a
        href={href}
        ref={ref}
        rel="noreferrer"
        target="_blank"
        {...props}
        className={clsx(props.className, !href && 'pointer-events-none')}
      >
        {children}
      </a>
    ) : (
      <Link href={href ?? '#'}>
        <a
          ref={ref}
          {...props}
          className={clsx(
            props.className,
            !href && 'pointer-events-none',
            loading && 'animate-pulse'
          )}
        >
          {children}
        </a>
      </Link>
    )
  }
)
