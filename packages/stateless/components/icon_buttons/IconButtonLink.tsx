import clsx from 'clsx'
import { forwardRef } from 'react'

import { IconButtonLinkProps } from '@dao-dao/types/stateless/IconButtonLink'

import { LinkWrapper } from '../LinkWrapper'
import {
  IconButtonifiedChildren,
  getIconButtonifiedClassNames,
  getPassthroughProps,
} from './IconButtonifier'

export const IconButtonLink = forwardRef<HTMLDivElement, IconButtonLinkProps>(
  function IconButtonLink({ containerClassName, ...props }, ref) {
    return (
      <LinkWrapper
        {...getPassthroughProps(props)}
        className={getIconButtonifiedClassNames(props)}
        containerClassName={clsx('inline-block', containerClassName)}
        ref={ref}
      >
        <IconButtonifiedChildren {...props} />
      </LinkWrapper>
    )
  }
)
