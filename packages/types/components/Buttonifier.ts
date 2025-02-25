import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

export interface ButtonifierProps {
  variant?:
    | 'primary'
    | 'primary_outline'
    | 'secondary'
    | 'ghost'
    | 'ghost_outline'
    | 'brand'
    | 'brand_outline'
    | 'brand_ghost'
    | 'underline'
    | 'none'
  size?: 'sm' | 'lg' | 'md' | 'none'
  loading?: boolean
  loadingVariant?: 'pulse' | 'loader'
  contentContainerClassName?: string
  pressed?: boolean
  hovering?: boolean
  disabled?: boolean
  showBadge?: boolean
  className?: string
  children?: ReactNode | ReactNode[]
  center?: boolean
  circular?: boolean
  noRounding?: boolean
  focused?: boolean
  allowClickWhileLoading?: boolean
}

export type ButtonProps = ComponentPropsWithoutRef<'button'> & ButtonifierProps
export type ButtonLinkProps = ButtonifierProps & LinkWrapperProps
export type StatefulButtonLinkProps = ButtonLinkProps & {
  /**
   * If true, the button will not load when navigating. This is likely only
   * useful when manually showing the navigating state differently.
   *
   * Defaults to false.
   */
  forceNoNavigating?: boolean
}
