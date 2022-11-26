import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { useRecoilState } from 'recoil'

import { navigatingToHrefAtom } from '@dao-dao/state/recoil'
import { LinkWrapper as StatelessLinkWrapper } from '@dao-dao/stateless'
import { LinkWrapperProps } from '@dao-dao/types'

export const LinkWrapper = forwardRef<
  HTMLDivElement,
  Omit<LinkWrapperProps, 'loading'>
>(function LinkWrapper({ children, href, onClick, ...props }, ref) {
  const router = useRouter()
  const [navigatingToHref, setNavigatingToHref] =
    useRecoilState(navigatingToHrefAtom)

  return (
    <StatelessLinkWrapper
      {...props}
      href={href}
      loading={navigatingToHref === href}
      onClick={(event) => {
        onClick?.(event)
        // If not on destination page, set navigating state. If already there or
        // href is invalid, do nothing.
        if (router.asPath !== href && href && href !== '#') {
          setNavigatingToHref(href)
        }
      }}
      ref={ref}
    >
      {children}
    </StatelessLinkWrapper>
  )
})
