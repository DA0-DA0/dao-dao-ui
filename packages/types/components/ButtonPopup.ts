import { ComponentType } from 'react'

import { ButtonLinkProps } from './Buttonifier'
import { PopupProps } from './Popup'

export type ButtonPopupSectionButton = {
  Icon?: ComponentType<{ className?: string }>
  label: string
  loading?: boolean
  disabled?: boolean
  pressed?: boolean
  // Default: true.
  closeOnClick?: boolean
} & (
  | {
      onClick: () => void
    }
  | {
      href: string
    }
)

export interface ButtonPopupSection {
  label?: string
  buttons: ButtonPopupSectionButton[]
}

export interface ButtonPopupProps
  extends Omit<PopupProps, 'children' | 'setOpenRef'> {
  sectionClassName?: string
  sections: ButtonPopupSection[]
  ButtonLink: ComponentType<ButtonLinkProps>
}
