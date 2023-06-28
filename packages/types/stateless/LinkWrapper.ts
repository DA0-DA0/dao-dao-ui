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
    // If not set, will fallback to detecting if url is relative or absolute. If
    // starts with `http`, it will open in a new tab.
    openInNewTab?: boolean
    // If true, will use shallow routing
    // (https://nextjs.org/docs/routing/shallow-routing) for local links.
    shallow?: boolean
  }
