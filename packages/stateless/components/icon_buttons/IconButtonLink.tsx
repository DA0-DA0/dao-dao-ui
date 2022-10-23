import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { LinkWrapper } from '../LinkWrapper'
import {
  IconButtonifiedChildren,
  IconButtonifierProps,
  getIconButtonifiedClassNames,
  getNonIconButtonifierProps,
} from './IconButtonifier'

export type IconButtonLinkProps = ComponentPropsWithoutRef<'a'> &
  IconButtonifierProps

export const IconButtonLink = forwardRef<
  HTMLAnchorElement,
  IconButtonLinkProps
>(function IconButtonLink(props, ref) {
  const className = clsx(
    getIconButtonifiedClassNames(props),
    'inline-block',
    props.disabled && 'pointer-events-none'
  )

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
