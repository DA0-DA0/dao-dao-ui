import { forwardRef } from 'react'

import { ButtonLinkProps } from '@dao-dao/types'

import { LinkWrapper } from '../LinkWrapper'
import {
  ButtonifiedChildren,
  getButtonifiedClassNames,
  getPassthroughProps,
} from './Buttonifier'

/**
 * ButtonLink component with consistent Button styling.
 *
 * Uses Buttonifier to maintain consistent styling with Button.
 * Forwards refs to allow integration with Tooltip component.
 * Provides link functionality via LinkWrapper.
 */
export const ButtonLink = forwardRef<HTMLDivElement, ButtonLinkProps>(
  function ButtonLink({ children, ...props }, ref) {
    return (
      <LinkWrapper
        {...getPassthroughProps(props)}
        className={getButtonifiedClassNames(props)}
        ref={ref}
      >
        <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
      </LinkWrapper>
    )
  }
)
