import Link from 'next/link'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

export const LinkWrapper = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'>
>(function LinkWrapper({ href, children, ...props }, ref) {
  // Remote link if starts with http (non-relative path).
  const remote = href?.startsWith('http')

  return remote ? (
    <a href={href} ref={ref} rel="noreferrer" target="_blank" {...props}>
      {children}
    </a>
  ) : (
    <Link href={href ?? '#'}>
      <a ref={ref} {...props}>
        {children}
      </a>
    </Link>
  )
})
