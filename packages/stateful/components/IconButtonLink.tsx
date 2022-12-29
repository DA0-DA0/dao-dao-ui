import { forwardRef } from 'react'

import { IconButtonLink as StatelessIconButtonLink } from '@dao-dao/stateless'
import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'

import { useUpdateNavigatingHref } from '../hooks/useUpdateNavigatingHref'

export const IconButtonLink = forwardRef<HTMLDivElement, IconButtonLinkProps>(
  function IconButtonLink({ children, loading, onClick, href, ...props }, ref) {
    const { navigatingToHref, updateNavigatingHref } = useUpdateNavigatingHref()

    const navigating = !!href && navigatingToHref === href

    return (
      <StatelessIconButtonLink
        {...props}
        href={href}
        loading={loading || navigating}
        onClick={(event) => {
          onClick?.(event)
          // Update global loading state.
          updateNavigatingHref(href)
        }}
        ref={ref}
      >
        {children}
      </StatelessIconButtonLink>
    )
  }
)
