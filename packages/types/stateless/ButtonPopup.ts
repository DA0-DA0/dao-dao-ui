import { ComponentType } from 'react'

import { ButtonLinkProps } from './Buttonifier'
import { PopupProps } from './Popup'

export type ButtonPopupSectionButton = {
  Icon?: ComponentType<{ className?: string }>
  label: string
  loading?: boolean
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
  sections: ButtonPopupSection[]
  ButtonLink: ComponentType<ButtonLinkProps>
  // If true, clicking on a button will not close the popup.
  dontCloseOnClick?: boolean
}
