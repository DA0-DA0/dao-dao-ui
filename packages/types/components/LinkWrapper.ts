import { ComponentPropsWithoutRef } from 'react'

export type LinkWrapperProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'onClick'
> &
  Pick<ComponentPropsWithoutRef<'a'>, 'onClick'> & {
    /**
     * Href.
     */
    href?: string
    /**
     * Optional class name applied to the container.
     */
    containerClassName?: string
    /**
     * Pulse loading if navigating locally.
     */
    loading?: boolean
    /**
     * Disable link.
     */
    disabled?: boolean
    /**
     * If not set, will fallback to detecting if url is relative or absolute. If
     * starts with `http`, it will open in a new tab.
     */
    openInNewTab?: boolean
    /**
     * If true, will use shallow routing
     * (https://nextjs.org/docs/routing/shallow-routing) for local links.
     */
    shallow?: boolean
    /**
     * If true, will replace the current route
     * (https://nextjs.org/docs/pages/api-reference/components/link#replace) for
     * local links.
     */
    replace?: boolean
    /**
     * If true, will prefetch the link. Defaults to false.
     */
    prefetch?: boolean
  }
