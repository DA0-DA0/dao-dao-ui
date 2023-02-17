import { ComponentType, ReactNode } from 'react'

import { KadoModalProps } from './KadoModal'
import { ModalProps } from './Modal'

export interface RightSidebarProps {
  wallet: ReactNode
  // Present if wallet connected, otherwise undefined.
  WalletFiatRampModal?: ComponentType<
    Pick<ModalProps, 'onClose' | 'visible'> &
      Pick<KadoModalProps, 'defaultMode'>
  >
}

export interface RightSidebarContentProps {
  children: ReactNode
}
