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
