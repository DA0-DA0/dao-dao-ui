import clsx from 'clsx'
import { forwardRef } from 'react'

import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'

import { LinkWrapper } from '../LinkWrapper'
import {
  IconButtonifiedChildren,
  getIconButtonifiedClassNames,
  getNonIconButtonifierProps,
} from './IconButtonifier'

export const IconButtonLink = forwardRef<
  HTMLAnchorElement,
  IconButtonLinkProps
>(function IconButtonLink({ disabled, ...props }, ref) {
  const className = clsx(
    getIconButtonifiedClassNames({
      ...props,
      // Disabled does not exist on link tags, but it is used by the class names
      // generator to add disabled stylings, so add it back in here.
      disabled,
    }),
    'inline-block'
  )
  // If disabled, don't navigate anywhere. Anchor tags cannot be disabled, so
  // this is a workaround.
  props.href = disabled ? '#' : props.href

  return (
    <LinkWrapper
      {...getNonIconButtonifierProps(props)}
      className={className}
      ref={ref}
    >
      <IconButtonifiedChildren {...props} />
    </LinkWrapper>
  )
})
