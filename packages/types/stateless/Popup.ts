import {
  ComponentType,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react'

export interface PopupProps {
  Trigger: ComponentType<{ onClick: () => void; open: boolean }>
  position: 'left' | 'right'
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
}
