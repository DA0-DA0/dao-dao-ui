import { ReactNode } from 'react'

import { BreadcrumbsProps } from './Breadcrumbs'

export type PageHeaderProps = {
  /**
   * Optionally display a title.
   */
  title?: string
  /**
   * Optionally display breadcrumbs.
   */
  breadcrumbs?: BreadcrumbsProps
  /**
   * Optional container class name.
   */
  className?: string
  /**
   * Hide bottom border.
   */
  noBorder?: boolean
  /**
   * Center title, breadcrumbs, or centerNode (whichever is displayed) even when
   * not responsive.
   */
  forceCenter?: boolean
  /**
   * Add content to the left of the header on mobile, next to the navigation
   * button.
   */
  leftMobileNode?: ReactNode
  /**
   * Add content to the center of the header.
   */
  centerNode?: ReactNode
  /**
   * Add content to the right side of the header.
   */
  rightNode?: ReactNode
  /**
   * Enable the gradient at the top of the page.
   */
  gradient?: boolean
  /*
   * Expands the border to the edge of the page.
   */
  expandBorderToEdge?: boolean
  /**
   * Optional class name for the title text.
   */
  titleClassName?: string
}
