import { ReactNode } from 'react'

export interface ModalProps {
  children: ReactNode
  onClose: () => void
  backdropClassName?: string
  containerClassName?: string
  hideCloseButton?: boolean
  header?: {
    title: string
    subtitle?: string
  }
  headerContent?: ReactNode
  footerContent?: ReactNode
  headerContainerClassName?: string
}
