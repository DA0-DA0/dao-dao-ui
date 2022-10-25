import { useRouter } from 'next/router'
import { forwardRef } from 'react'
import { useRecoilState } from 'recoil'

import { navigatingToPageAtom } from '@dao-dao/state/recoil'
import { LinkWrapper as StatelessLinkWrapper } from '@dao-dao/stateless'
import { LinkWrapperProps } from '@dao-dao/types'

export const LinkWrapper = forwardRef<
  HTMLAnchorElement,
  Omit<LinkWrapperProps, 'loading'>
>(function LinkWrapper({ children, href, onClick, ...props }, ref) {
  const router = useRouter()
  const [navigatingToPage, setNavigatingToPage] =
    useRecoilState(navigatingToPageAtom)

  return (
    <StatelessLinkWrapper
      {...props}
      href={href}
      loading={navigatingToPage === href}
      onClick={(event) => {
        onClick?.(event)
        // If not on destination page, set navigating state. If already there,
        // do nothing.
        if (router.asPath !== href) {
          setNavigatingToPage(href)
        }
      }}
      ref={ref}
    >
      {children}
    </StatelessLinkWrapper>
  )
})
