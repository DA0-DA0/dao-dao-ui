import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { IconButtonifierProps } from '@dao-dao/types/stateless/IconButtonifier'

import {
  IconButtonifiedChildren,
  getIconButtonifiedClassNames,
  getPassthroughProps,
} from './IconButtonifier'

export type IconButtonProps = ComponentPropsWithoutRef<'button'> &
  IconButtonifierProps

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton({ type = 'button', ...props }, ref) {
    return (
      <button
        {...getPassthroughProps(props)}
        className={getIconButtonifiedClassNames(props)}
        ref={ref}
        type={type}
      >
        <IconButtonifiedChildren {...props} />
      </button>
    )
  }
)
