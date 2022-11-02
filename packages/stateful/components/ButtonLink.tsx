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
    { children, loading, className, onClick, ...props },
    ref
  ) {
    const router = useRouter()
    const [navigatingToHref, setNavigatingToHref] =
      useRecoilState(navigatingToHrefAtom)

    const navigating = !!props.href && navigatingToHref === props.href

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
          // If not on destination page, set navigating state. If already there,
          // do nothing.
          if (router.asPath !== props.href) {
            setNavigatingToHref(props.href)
          }
        }}
        ref={ref}
      >
        {children}
      </StatelessButtonLink>
    )
  }
)
