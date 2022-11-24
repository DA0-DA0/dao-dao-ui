import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { LinkWrapper } from '../LinkWrapper'
import {
  ButtonifiedChildren,
  ButtonifierProps,
  getButtonifiedClassNames,
  getPassthroughProps,
} from './Buttonifier'

export type ButtonLinkProps = ComponentPropsWithoutRef<'a'> & ButtonifierProps

// Forward ref so we can use Tooltip with this element.
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink({ children, disabled, ...props }, ref) {
    const className = clsx(
      getButtonifiedClassNames({
        ...props,
        // Disabled does not exist on link tags, but it is used by the class
        // names generator to add disabled stylings, so add it back in here.
        disabled,
      }),
      'inline-block'
    )
    // If disabled or loading, don't navigate anywhere. Anchor tags cannot be
    // disabled, so this is a workaround.
    props.href = disabled || props.loading ? '#' : props.href

    return (
      <LinkWrapper
        {...getPassthroughProps(props)}
        className={className}
        ref={ref}
      >
        <ButtonifiedChildren {...props}>{children}</ButtonifiedChildren>
      </LinkWrapper>
    )
  }
)
