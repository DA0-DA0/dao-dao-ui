import { ArrowDropDown } from '@mui/icons-material'
import clsx from 'clsx'
import { forwardRef } from 'react'

import { IconButton, IconButtonProps } from './IconButton'

export interface DropdownIconButtonProps
  extends Partial<Omit<IconButtonProps, 'onClick' | 'Icon'>> {
  open: boolean
  toggle: () => void
}

export const DropdownIconButton = forwardRef<
  HTMLButtonElement,
  DropdownIconButtonProps
>(function DropdownIconButton({ open, toggle, iconClassName, ...props }, ref) {
  return (
    <IconButton
      Icon={ArrowDropDown}
      iconClassName={clsx(
        '!transition-transform',
        open ? 'rotate-0' : '-rotate-90',
        iconClassName
      )}
      onClick={toggle}
      size="sm"
      variant="ghost"
      {...props}
      ref={ref}
    />
  )
})
