import { forwardRef } from 'react'

import { LinkWrapper as StatelessLinkWrapper } from '@dao-dao/stateless'
import { LinkWrapperProps } from '@dao-dao/types'

import { useUpdateNavigatingHref } from '../hooks/useUpdateNavigatingHref'

export const LinkWrapper = forwardRef<
  HTMLDivElement,
  Omit<LinkWrapperProps, 'loading'>
>(function LinkWrapper({ children, href, onClick, ...props }, ref) {
  const { navigatingToHref, updateNavigatingHref } = useUpdateNavigatingHref()

  return (
    <StatelessLinkWrapper
      {...props}
      href={href}
      loading={navigatingToHref === href}
      onClick={(event) => {
        onClick?.(event)
        // Update global loading state.
        updateNavigatingHref(href)
      }}
      ref={ref}
    >
      {children}
    </StatelessLinkWrapper>
  )
})
