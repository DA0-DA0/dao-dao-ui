import clsx from 'clsx'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state/recoil'
import {
  ButtonLinkProps,
  ButtonLink as StatelessButtonLink,
} from '@dao-dao/stateless'

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    { children, loading, className, onClick, href, ...props },
    ref
  ) {
    const router = useRouter()
    const [navigatingToHref, setNavigatingToHref] =
      useRecoilState(navigatingToHrefAtom)

    // If disabled or loading, don't navigate anywhere. Anchor tags cannot be
    // disabled, so this is a workaround.
    href = props.disabled || loading ? '#' : href

    const navigating = !!href && navigatingToHref === href

    // Pulse for these variants instead of displaying loader.
    const pulseVariant =
      props.variant === 'underline' || props.variant === 'none'

    return (
      <StatelessButtonLink
        {...props}
        className={clsx(
          className,
          pulseVariant && navigating && 'animate-pulse'
        )}
        loading={loading || (!pulseVariant && navigating)}
        onClick={(event) => {
          onClick?.(event)
          // If not on destination page, set navigating state. If already there
          // or href is invalid, do nothing.
          if (router.asPath !== href && href && href !== '#') {
            setNavigatingToHref(href)
          }
        }}
        ref={ref}
      >
        {children}
      </StatelessButtonLink>
    )
  }
)
