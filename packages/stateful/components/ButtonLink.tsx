import { forwardRef } from 'react'

import {
  ButtonLinkProps,
  ButtonLink as StatelessButtonLink,
} from '@dao-dao/stateless'

import { useUpdateNavigatingHref } from '../hooks/useUpdateNavigatingHref'

export const ButtonLink = forwardRef<HTMLDivElement, ButtonLinkProps>(
  function ButtonLink({ children, loading, onClick, href, ...props }, ref) {
    const { navigatingToHref, updateNavigatingHref } = useUpdateNavigatingHref()

    const navigating = !!href && navigatingToHref === href

    return (
      <StatelessButtonLink
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
      </StatelessButtonLink>
    )
  }
)
