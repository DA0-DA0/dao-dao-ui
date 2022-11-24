import clsx from 'clsx'
import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state/recoil'
import { IconButtonLink as StatelessIconButtonLink } from '@dao-dao/stateless'
import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'

export const IconButtonLink = forwardRef<
  HTMLAnchorElement,
  IconButtonLinkProps
>(function IconButtonLink(
  { children, className, onClick, href, ...props },
  ref
) {
  const router = useRouter()
  const [navigatingToHref, setNavigatingToHref] =
    useRecoilState(navigatingToHrefAtom)

  // If disabled, don't navigate anywhere. Anchor tags cannot be disabled, so
  // this is a workaround.
  href = props.disabled ? '#' : href

  const navigating = !!href && navigatingToHref === href

  return (
    <StatelessIconButtonLink
      {...props}
      className={clsx(className, navigating && 'animate-pulse')}
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
    </StatelessIconButtonLink>
  )
})
