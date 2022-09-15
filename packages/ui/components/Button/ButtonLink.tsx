import clsx from 'clsx'
import Link from 'next/link'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import {
  ButtonifiedChildren,
  ButtonifierProps,
  getButtonifiedClassNames,
  getNonButtonifierProps,
} from './Buttonifier'

export type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & ButtonifierProps

// Forward ref so we can use Tooltip with this element.
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink({ children, href, ...props }, ref) {
    const className = clsx(getButtonifiedClassNames(props), 'inline-block')

    // Remote link if starts with http (non-relative path).
    const remote = href?.startsWith('http')

    return remote ? (
      <a
        href={href}
        rel="noreferrer"
        target="_blank"
        {...getNonButtonifierProps(props)}
        className={className}
        ref={ref}
      >
        <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
      </a>
    ) : (
      <Link href={href ?? '#'}>
        <a {...getNonButtonifierProps(props)} className={className} ref={ref}>
          <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
        </a>
      </Link>
    )
  }
)
