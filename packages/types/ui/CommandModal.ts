import { ReactNode } from 'react'

import { CommandModalContext } from '../command'

export interface CommandModalProps {
  visible: boolean
  setVisible: (visible: boolean) => void
  children: ReactNode
  contexts: CommandModalContext[]
  closeCurrentContext: () => void
  filter: string
  setFilter: (filter: string) => void
}
