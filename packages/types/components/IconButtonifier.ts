import { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react'

export interface IconButtonifierProps {
  variant:
    | 'primary'
    | 'primary_inverted'
    | 'secondary'
    | 'ghost'
    | 'brand'
    | 'highlight'
    | 'none'
  // Custom size requires manual setting of sizes.
  size?: 'default' | 'xl' | 'lg' | 'sm' | 'xs' | 'custom'
  circular?: boolean
  noRounding?: boolean
  Icon: ComponentType<{ className: string }>
  disabled?: boolean
  loading?: boolean
  focused?: boolean
  className?: string
  iconClassName?: string
  /**
   * Whether or not to prompt for confirmation before clicking.
   */
  confirm?: boolean
  children?: ReactNode
}

export type IconButtonProps = ComponentPropsWithoutRef<'button'> &
  IconButtonifierProps
