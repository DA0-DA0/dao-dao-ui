import clsx from 'clsx'
import Link from 'next/link'
import { forwardRef } from 'react'

import { LinkWrapperProps } from '@dao-dao/types'

export const LinkWrapper = forwardRef<HTMLDivElement, LinkWrapperProps>(
  function LinkWrapper(
    {
      href,
      children,
      loading,
      disabled,
      className,
      containerClassName,
      onClick,
      ...props
    },
    ref
  ) {
    const contentClassName = clsx(
      className,
      // If loading, disabled, or no href, disable touch interaction. Anchor
      // tags cannot be disabled, so this is a workaround.
      (loading || disabled || !href) && 'pointer-events-none'
    )

    // Remote link if starts with http (non-relative path).
    const remote = href?.startsWith('http')

    return (
      // Add div wrapper with ref to allow tooltips even when the link's touch
      // interaction is disabled.
      <div
        className={clsx(containerClassName, loading && 'animate-pulse')}
        {...props}
        ref={ref}
      >
        {remote ? (
          <a
            className={contentClassName}
            href={href}
            onClick={onClick}
            rel="noreferrer"
            target="_blank"
          >
            {children}
          </a>
        ) : (
          <Link href={href ?? '#'}>
            <a className={contentClassName} onClick={onClick}>
              {children}
            </a>
          </Link>
        )}
      </div>
    )
  }
)
