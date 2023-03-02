import { ComponentType } from 'react'

export interface IconButtonifierProps {
  variant: 'primary' | 'primary_inverted' | 'secondary' | 'ghost' | 'none'
  // Custom size requires manual setting of sizes.
  size?: 'default' | 'xl' | 'lg' | 'sm' | 'xs' | 'custom'
  circular?: boolean
  Icon: ComponentType<{ className: string }>
  disabled?: boolean
  loading?: boolean
  focused?: boolean
  className?: string
  iconClassName?: string
}
