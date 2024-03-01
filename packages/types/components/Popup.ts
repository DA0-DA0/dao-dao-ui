import {
  ComponentType,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react'

import { ButtonProps } from './Buttonifier'
import { IconButtonProps } from './IconButtonifier'

export interface PopupProps {
  trigger: PopupTrigger
  position: 'left' | 'right' | 'wide'
  children: ReactNode | ReactNode[]
  wrapperClassName?: string
  popupClassName?: string
  getKeydownEventListener?: (
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
  ) => (event: KeyboardEvent) => any
  headerContent?: ReactNode
  onOpen?: () => void
  onClose?: () => void
  // Give parent a way to access and control open and setOpen.
  openRef?: MutableRefObject<boolean | null>
  setOpenRef?: MutableRefObject<Dispatch<SetStateAction<boolean>> | null>
  /**
   * Optionally add offset to the top of the popup.
   */
  topOffset?: number
}

export type PopupTriggerOptions = {
  open: boolean
  onClick: () => void
}

export type PopupTriggerCustomComponent = ComponentType<{
  onClick: () => void
  open: boolean
}>

export type PopupTrigger =
  | {
      type: 'button'
      tooltip?: string
      props:
        | Omit<ButtonProps, 'onClick' | 'pressed'>
        | ((
            options: PopupTriggerOptions
          ) => Omit<ButtonProps, 'onClick' | 'pressed'>)
    }
  | {
      type: 'icon_button'
      tooltip?: string
      props:
        | Omit<IconButtonProps, 'onClick' | 'focused'>
        | ((
            options: PopupTriggerOptions
          ) => Omit<IconButtonProps, 'onClick' | 'focused'>)
    }
  | {
      type: 'custom'
      Renderer: PopupTriggerCustomComponent
    }
  | {
      type: 'manual'
      open: boolean
      setOpen: Dispatch<SetStateAction<boolean>>
    }
