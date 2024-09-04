import { ComponentPropsWithoutRef } from 'react'

export type SearchBarProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'variant'
> & {
  hideIcon?: boolean
  variant?: 'sm' | 'lg'
  ghost?: boolean
  onIconClick?: () => void
  iconClassName?: string
  containerClassName?: string
}
