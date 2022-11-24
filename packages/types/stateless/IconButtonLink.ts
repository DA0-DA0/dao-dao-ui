import { ComponentPropsWithoutRef } from 'react'

import { IconButtonifierProps } from './IconButtonifier'

export type IconButtonLinkProps = ComponentPropsWithoutRef<'a'> &
  IconButtonifierProps
