import { ComponentPropsWithoutRef } from 'react'

import {
  IconButtonifiedChildren,
  IconButtonifierProps,
  getIconButtonifiedClassNames,
} from './IconButtonifier'

export type IconButtonProps = ComponentPropsWithoutRef<'button'> &
  IconButtonifierProps

export const IconButton = ({ type = 'button', ...props }: IconButtonProps) => (
  <button
    {...props}
    className={getIconButtonifiedClassNames(props)}
    type={type}
  >
    <IconButtonifiedChildren {...props} />
  </button>
)
