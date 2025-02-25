import { forwardRef } from 'react'

import { ButtonLink as StatelessButtonLink } from '@dao-dao/stateless'
import { StatefulButtonLinkProps } from '@dao-dao/types'

import { useUpdateNavigatingHref } from '../hooks/useUpdateNavigatingHref'

export const ButtonLink = forwardRef<HTMLDivElement, StatefulButtonLinkProps>(
  function ButtonLink(
    { children, loading, onClick, href, forceNoNavigating = false, ...props },
    ref
  ) {
    const { navigatingToHref, updateNavigatingHref } = useUpdateNavigatingHref()

    const navigating = !!href && navigatingToHref === href && !forceNoNavigating

    return (
      <StatelessButtonLink
        {...props}
        href={href}
        loading={loading || navigating}
        onClick={(event) => {
          onClick?.(event)
          // Update global loading state.
          if (!props.openInNewTab) {
            updateNavigatingHref(href)
          }
        }}
        ref={ref}
      >
        {children}
      </StatelessButtonLink>
    )
  }
)
