import { ComponentPropsWithoutRef } from 'react'

export type LinkWrapperProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onClick'
> &
  Pick<ComponentPropsWithoutRef<'a'>, 'onClick'> & {
    href?: string
    containerClassName?: string
    // Pulse loading if navigating locally.
    loading?: boolean
    disabled?: boolean
  }
