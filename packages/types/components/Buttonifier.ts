import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { LinkWrapperProps } from './LinkWrapper'

/**
 * Core props for button styling and behavior.
 * Used by both Button and ButtonLink components.
 */
export type ButtonifierProps = {
  // Appearance
  /** Button visual style variant */
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
  /** Button size */
  size?: 'sm' | 'md' | 'lg' | 'none'
  /** Additional class names to apply to button */
  className?: string
  /** Additional class names for the content container */
  contentContainerClassName?: string
  /** Whether to center the button content */
  center?: boolean
  /** Whether button should be circular */
  circular?: boolean
  /** Disables default border radius */
  noRounding?: boolean

  // State
  /** Whether button is in loading state */
  loading?: boolean
  /** Loading animation style */
  loadingVariant?: 'pulse' | 'loader'
  /** Disabled state */
  disabled?: boolean
  /** Whether button is in pressed state */
  pressed?: boolean
  /** Whether button should appear hovered */
  hovering?: boolean
  /** Whether button should appear focused */
  focused?: boolean
  /** Whether to show a notification badge */
  showBadge?: boolean
  /** Allow button to be clicked even when loading */
  allowClickWhileLoading?: boolean

  // Content
  /** Button content */
  children?: ReactNode | ReactNode[]
}

/** Props for the Button component */
export type ButtonProps = ComponentPropsWithoutRef<'button'> & ButtonifierProps

/** Props for the ButtonLink component */
export type ButtonLinkProps = ButtonifierProps & LinkWrapperProps

/** Props for the StatefulButtonLink component with navigation state handling */
export type StatefulButtonLinkProps = ButtonLinkProps & {
  /**
   * If true, the button will not load when navigating. This is likely only
   * useful when manually showing the navigating state differently.
   *
   * Defaults to false.
   */
  forceNoNavigating?: boolean
}
