import { forwardRef } from 'react'

import { ButtonLinkProps } from '@dao-dao/types'

import { LinkWrapper } from '../LinkWrapper'
import {
  ButtonifiedChildren,
  getButtonifiedClassNames,
  getPassthroughProps,
} from './Buttonifier'

// Forward ref so we can use Tooltip with this element.
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
