import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state/recoil'
import { IconButtonLink as StatelessIconButtonLink } from '@dao-dao/stateless'
import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'

export const IconButtonLink = forwardRef<HTMLDivElement, IconButtonLinkProps>(
  function IconButtonLink({ children, loading, onClick, href, ...props }, ref) {
    const router = useRouter()
    const [navigatingToHref, setNavigatingToHref] =
      useRecoilState(navigatingToHrefAtom)

    const navigating = !!href && navigatingToHref === href

    return (
      <StatelessIconButtonLink
        {...props}
        href={href}
        loading={loading || navigating}
        onClick={(event) => {
          onClick?.(event)
          // If not on destination page, set navigating state. If already there
          // or href is invalid, do nothing.
          if (
            router.asPath !== href &&
            href &&
            href !== '#' &&
            // Don't set navigating if remote.
            !href.startsWith('http')
          ) {
            setNavigatingToHref(href)
          }
        }}
        ref={ref}
      >
        {children}
      </StatelessIconButtonLink>
    )
  }
)
